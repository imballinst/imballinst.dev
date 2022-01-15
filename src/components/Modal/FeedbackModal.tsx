import type { JSX } from 'preact';
import { useCallback, useState, useEffect } from 'preact/hooks';
import { Button } from '../Button';
import { CheckIcon, WarningIcon } from '../Icons';
import { Text } from '../Typography';
import { Modal } from './Modal';

interface FeedbackModalProps {
  slug: string;
}

interface FeedbackForm {
  content: string;
}

type FeedbackFormError = {
  [index in keyof FeedbackForm]: string | undefined;
};

const MODAL_TITLE = 'Send anonymous feedback';

export function FeedbackModal({ slug }: FeedbackModalProps) {
  // TODO(imballinst): use react-hook-form (not sure if it can be applied for Preact?).
  const [form, setForm] = useState<FeedbackForm>({ content: '' });
  const [formError, setFormError] = useState<FeedbackFormError>({
    content: undefined
  });
  const [isOpen, setIsOpen] = useState(false);
  const [fetchState, setFetchState] = useState<
    'idle' | 'fetching' | 'success' | 'error'
  >('idle');

  useEffect(() => {
    function listener() {
      setIsOpen(true);
    }

    window.addEventListener('openmodal', listener);

    return () => window.removeEventListener('openmodal', listener);
  }, []);

  const onSubmit = useCallback(async () => {
    const nextError = getNextFormError(form.content);

    if (nextError.content !== undefined) {
      setFormError(nextError);
      return;
    }

    // POST.
    try {
      setFetchState('fetching');

      await fetch('/.netlify/functions/comments', {
        method: 'POST',
        body: JSON.stringify({
          slug,
          content: form.content
        })
      });

      setFetchState('success');
    } catch (err) {
      console.error(err);
      setFetchState('error');
    }
  }, [slug, form]);

  const closeModal = useCallback(() => {
    setIsOpen(false);

    // Wait until the modal is closed fully.
    setTimeout(() => {
      setFetchState('idle');
    }, 500);
  }, []);

  function onInput(e: JSX.TargetedEvent<HTMLTextAreaElement>) {
    const value = e.currentTarget.value;
    const nextError = getNextFormError(value);

    setFormError(nextError);
  }

  function onFormChange(e: JSX.TargetedEvent<HTMLTextAreaElement>) {
    setForm({ content: e.currentTarget.value });
  }

  let modalContent: JSX.Element | null = null;

  if (fetchState === 'success') {
    modalContent = (
      <>
        <div className="flex flex-col justify-center items-center">
          <CheckIcon className="h-10 w-10 text-teal-600 dark:text-teal-300" />

          <Text className="text-lg text-center">
            Thank you for submitting your feedback!
          </Text>
        </div>
        <div className="mt-8 flex justify-end">
          <Button onClick={closeModal}>Close</Button>
        </div>
      </>
    );
  } else if (fetchState === 'error') {
    modalContent = (
      <>
        <div className="flex flex-col justify-center items-center">
          <WarningIcon className="h-14 w-14 text-red-600 dark:text-red-400" />

          <Text className="text-lg text-center">
            Oh no! Something error happened. Please try again later.
          </Text>
        </div>
        <div className="mt-8 flex justify-end">
          <Button onClick={closeModal}>Close</Button>
        </div>
      </>
    );
  } else {
    const border =
      formError.content === undefined ? 'border-gray-300' : 'border-red-500';

    modalContent = (
      <>
        {/* Not required yet since we only have 1 field. */}
        {/* <label
          htmlFor="feedback-content"
          className="block text-sm font-medium text-gray-700"
        >
          Feedback content
        </label> */}
        <div>
          <textarea
            id="feedback-content"
            name="feedback-content"
            rows={5}
            className={`${border} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border rounded-md`}
            placeholder="I think this post is..."
            onChange={onFormChange}
            onInput={onInput}
          />
        </div>
        <Text
          className="text-sm min-h-[40px]"
          colorScheme={formError.content ? 'red' : 'gray'}
        >
          {formError.content ||
            'Submit your feedback for this post. What do you like? What do you not like? What do you want to see more in the future?'}
        </Text>
        <div className="mt-8 flex justify-end">
          <Button onClick={closeModal}>Cancel</Button>
          <Button
            className="ml-2"
            onClick={onSubmit}
            colorScheme="teal"
            disabled={fetchState === 'fetching'}
          >
            {fetchState === 'fetching' ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </>
    );
  }

  return (
    <Modal
      onClose={closeModal}
      open={isOpen}
      title={MODAL_TITLE}
      onSubmit={onSubmit}
    >
      <div className="mt-12">{modalContent}</div>
    </Modal>
  );
}

// Helper functions.
function getNextFormError(value: string) {
  const nextError: FeedbackFormError = {
    content: undefined
  };

  if (value === '') {
    nextError.content = 'This is a required field.';
  }

  return nextError;
}
