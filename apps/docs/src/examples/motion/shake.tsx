/** Submit without an @ to see the field shake. */
import { Button, FormField, TextInput, useShake } from '@wideset/react';
import { type ComponentProps, useState } from 'react';

export default function MotionShake() {
  const { ref, shake } = useShake<HTMLInputElement>();
  const [error, setError] = useState('');

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = (event) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get('email'));
    const isValid = email.includes('@');
    setError(isValid ? '' : 'Enter a valid email address');
    if (!isValid) shake();
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex w-full max-w-[20rem] flex-col items-start gap-ws-4"
    >
      <FormField label="Email" htmlFor="motion-shake-email" errorText={error}>
        <TextInput
          ref={ref}
          id="motion-shake-email"
          name="email"
          placeholder="name@company.com"
          variant={error ? 'danger' : 'primary'}
        />
      </FormField>
      <Button type="submit">Submit</Button>
    </form>
  );
}
