'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, CreateNoteDto } from '../../lib/api';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

const ALLOWED_TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;

interface FormValues {
  title: string;
  content: string;
  tag: (typeof ALLOWED_TAGS)[number];
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be 50 characters or less')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content must be 500 characters or less'),
  tag: Yup.string()
    .oneOf([...ALLOWED_TAGS], 'Invalid tag selected')
    .required('Tag is required'),
});

const initialValues: FormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

export function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: CreateNoteDto) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <h2 className={css.title}>Create Note</h2>

          <div className={css.fieldGroup}>
            <label htmlFor="title" className={css.label}>
              Title
            </label>
            <Field
              type="text"
              id="title"
              name="title"
              className={css.input}
              placeholder="Enter note title..."
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.fieldGroup}>
            <label htmlFor="content" className={css.label}>
              Content (optional)
            </label>
            <Field
              as="textarea"
              id="content"
              name="content"
              className={css.textarea}
              placeholder="Enter note content..."
              rows={4}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.fieldGroup}>
            <label htmlFor="tag" className={css.label}>
              Tag
            </label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              {ALLOWED_TAGS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          {mutation.isError && (
            <p className={css.error}>
              Failed to create note. Please try again.
            </p>
          )}

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
              disabled={isSubmitting || mutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || mutation.isPending}
            >
              {mutation.isPending ? 'Creating...' : 'Create Note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}