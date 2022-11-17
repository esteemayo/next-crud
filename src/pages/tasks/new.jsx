import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Grid, Loader } from 'semantic-ui-react';

import { createTask } from '@/services/taskService';

const initialState = {
  title: '',
  description: '',
};

const CreateTask = () => {
  const { push } = useRouter();
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [inputs, setInputs] = useState(initialState);

  const { title, description } = inputs;

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let errors = {};

    if (title.trim() === '') {
      errors.title = 'Title is required';
    }

    if (description.trim() === '') {
      errors.description = 'Description is required';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);

    await handleCreateTask();
    await push('/');
  };

  const handleCreateTask = async () => {
    try {
      await createTask({ ...inputs });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid
      centered
      verticalAlign='middle'
      columns='3'
      style={{ height: '80vh' }}
    >
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <div>
            <h1>{taskId ? 'Update Task' : 'Create Task'}</h1>
            <div>
              {isSubmit ? (
                <Loader active inline='centered' />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Input
                    autoFocus
                    type='text'
                    name='title'
                    label='Title'
                    value={title}
                    placeholder='Enter Title'
                    onChange={handleChange}
                    error={
                      errors.title ? { content: 'Please enter a title' } : null
                    }
                  />
                  <Form.TextArea
                    name='description'
                    label='Description'
                    value={description}
                    placeholder='Enter Description'
                    onChange={handleChange}
                    error={
                      errors.description
                        ? { content: 'Please enter a description' }
                        : null
                    }
                  />
                  <Button type='submit' primary>
                    {taskId ? 'Update' : 'Submit'}
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateTask;
