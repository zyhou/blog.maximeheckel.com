import styled from '@emotion/styled';
import React from 'react';

interface CardWrapperProps {
  opaque?: boolean;
  level?: 0 | 1 | 2 | 3;
}

export function isElementOfType<P = {}>(
  element: any,
  ComponentType: React.ComponentType<P>
): element is React.ReactElement<P> {
  return (
    element != null &&
    element.type != null &&
    element.type.displayName != null &&
    element.type.displayName === ComponentType.displayName
  );
}

export function isHeaderElement(
  child: any
): child is React.ReactElement<{ children: React.ReactNode }> {
  return isElementOfType(child, CardHeader);
}

const DEFAULT_TAG = 'div';

const CardWrapper = styled(DEFAULT_TAG)<CardWrapperProps>`
  // TODO reajust background color based on opacity. Needs new colors
  background: var(--maximeheckel-colors-foreground);
  backdrop-filter: ${(p) => (p.opaque ? '' : 'blur(6px)')};
  border-radius: var(--border-radius-2);
  box-shadow: ${(p) =>
    p.level === 0 ? 'none' : `var(--maximeheckel-shadow-${p.level || '1'})`};
`;

const CardHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: var(--border-radius-1);
  border-top-right-radius: var(--border-radius-1);
  min-height: 50px;
  padding: 0px 24px;
  color: var(--maximeheckel-colors-typeface-2);
  font-weight: 500;
  border-bottom: 1px solid var(--maximeheckel-colors-emphasis);
`;

const CardBody = styled('div')`
  padding: 36px 24px;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

interface CardComposition {
  Header?: React.FC<{
    className?: string;
  }>;
  Body?: React.FC<{
    className?: string;
  }>;
}

interface CardProps extends CardWrapperProps {
  title?: string;
  className?: string;
  as?: React.ElementType;
  children: React.ReactNode;
}

function Card<T>(props: CardProps & CardComposition & T) {
  const { as: Component, children, opaque, level, title, ...rest } = props;

  // TODO: Abstract/revisit this
  const [headerComponent, restOfChildren] = React.Children.toArray(
    children
  ).reduce(
    (output: Array<Array<React.ReactNode>>, child: React.ReactNode) => {
      if (isHeaderElement(child)) {
        output[0].push(child);
      } else {
        output[1].push(child);
      }
      return output;
    },
    [[], []]
  ) as Array<Array<React.ReactNode>>;

  let header = null;

  if (headerComponent.length > 0) {
    header = headerComponent[0];
  }

  if (title) {
    header = <CardHeader>{title}</CardHeader>;
  }

  return (
    <CardWrapper as={Component} level={level} opaque={opaque} {...rest}>
      {header}
      {restOfChildren}
    </CardWrapper>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.displayName = 'Card';

export default Card;
