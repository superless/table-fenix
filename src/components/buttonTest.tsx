import * as React from 'react';
import { Button } from 'semantic-ui-react';

export interface IButtonTestProps {
  message: string;
  nro: number;
}

export default function ButtonTest(props: IButtonTestProps) {
  const messageNumber = `${props.message}:${props.nro}`;
  return (
    <Button.Group vertical>
      <Button>{messageNumber}</Button>
      <Button>XY</Button>
    </Button.Group>
  );
}
