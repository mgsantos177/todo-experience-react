import { Button } from "@chakra-ui/react";

interface TableUserProps {
  test: () => void;
}

export default function ModalComplet({ test }: TableUserProps) {
  return (
    <div>
      <Button onClick={() => test()}>Oba</Button>
    </div>
  );
}
