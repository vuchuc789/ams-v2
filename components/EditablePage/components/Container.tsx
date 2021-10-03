import { useNode, UserComponent } from '@craftjs/core';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: UserComponent<Partial<ContainerProps>> = ({
  children,
  className,
}) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div
      ref={(ref: HTMLDivElement) => {
        connect(ref);
      }}
      className={className}
    >
      {children}
    </div>
  );
};
