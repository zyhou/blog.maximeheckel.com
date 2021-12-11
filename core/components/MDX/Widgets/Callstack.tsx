import Button from '@theme/components/Button';
import Card from '@theme/components/Card';
import { HighlightedCodeText } from '@theme/components/Code/CodeBlock';
import { calculateLinesToHighlight } from '@theme/components/Code/utils';
import Flex from '@theme/components/Flex';
import { ArrowIcon, PauseIcon, PlayIcon } from '@theme/components/Icons';
import Text from '@theme/components/Typography';
import Tooltip from '@theme/components/Tooltip';
import React from 'react';

function getStackTrace() {
  let stack = new Error().stack || '';
  stack = stack.split('\n').map(function (line) {
    return line.trim();
  });

  const cleanedStack = stack.splice(stack[0] == 'Error' ? 2 : 1).map((line) => {
    return line.split(' ')[1];
  });
  return cleanedStack;
}

function add(value, increment) {
  console.log(getStackTrace());
  return value + increment;
}

function plusTwo(value) {
  console.log(getStackTrace());
  return add(value, 2);
}

function run() {
  console.log(getStackTrace());
  console.log(plusTwo(1));
}

run();

const codeString = `function add(value, increment) {
    return value + increment;
}

function plusTwo(value) {
    return add(value,2);

}

function run() {
    console.log(plusTwo(1));

}

run()`;

const linesToHighlight = [
  '',
  '',
  '{13,9}',
  '{5,10}',
  '{1,6}',
  '{5,10}',
  '{13,9}',
  '',
  '',
];
const blockInCallStack = [
  [],
  ['main()'],
  ['run()', 'main()'],
  ['plusTwo(1)', 'run()', 'main()'],
  ['add(1,2)', 'plusTwo(1)', 'run()', 'main()'],
  ['plusTwo(1)', 'run()', 'main()'],
  ['run()', 'main()'],
  ['main()'],
  [],
];

const Callstack = () => {
  const [indexHighlight, setIndexHighlight] = React.useState(0);
  const [paused, setPaused] = React.useState(true);

  React.useEffect(() => {
    if (paused) {
      return;
    }

    if (indexHighlight === linesToHighlight.length - 1) {
      setPaused(true);
      setIndexHighlight(0);
      return;
    }

    setTimeout(() => {
      setIndexHighlight((prev) => {
        return prev + 1;
      });
    }, 1500);
  }, [paused, indexHighlight]);

  // eval(codeString);

  run();

  return (
    <Card title="Callstack" css={{ marginBottom: '2.25rem' }}>
      <Flex>
        <HighlightedCodeText
          codeString={codeString}
          language="javascript"
          highlightLine={calculateLinesToHighlight(
            linesToHighlight[indexHighlight]
          )}
          highlightStyle="opacity"
        ></HighlightedCodeText>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="end"
          id="callstack"
          css={{
            height: '250px',
            flexGrow: 1,
            gap: '8px',
          }}
        >
          {blockInCallStack[indexHighlight].map((code, index) => {
            return (
              <Flex
                direction="column"
                justifyContent="center"
                css={{
                  width: '90%',
                  height: '48px',
                  background: 'var(--maximeheckel-colors-emphasis)',
                  color: 'var(--maximeheckel-colors-typeface-primary)',
                  borderRadius: 'var(--border-radius-1)',
                }}
                key={index}
              >
                {code}
              </Flex>
            );
          })}
        </Flex>
      </Flex>
      <Card.Body>
        <Flex justifyContent="space-between">
          <Tooltip
            id="playpauseButton-callstack"
            tooltipText={paused ? 'Play' : 'Pause'}
          >
            <Button
              aria-label={paused ? 'Play' : 'Pause'}
              aria-describedby="playpauseButton"
              variant="icon"
              icon={paused ? <PlayIcon /> : <PauseIcon />}
              onClick={() => setPaused((prev) => !prev)}
            />
          </Tooltip>
          <Flex justifyContent="center" css={{ gap: '12px' }}>
            <Tooltip id="previous-step-callstack" tooltipText="Previous step">
              <Button
                id="prev"
                aria-label="Previous"
                variant="icon"
                onClick={() =>
                  setIndexHighlight((prev) => {
                    if (prev - 1 < 0) {
                      return 0;
                    }
                    return prev - 1;
                  })
                }
                icon={<ArrowIcon style={{ transform: 'scaleX(-1)' }} />}
              />
            </Tooltip>
            <Text css={{ marginBottom: 0 }} size="2">
              {indexHighlight + 1}/{linesToHighlight.length - 1}
            </Text>
            <Tooltip id="next-step-callstack" tooltipText="Next step">
              <Button
                id="next"
                aria-label="Next"
                variant="icon"
                onClick={() =>
                  setIndexHighlight((prev) => {
                    if (prev + 1 > linesToHighlight.length - 1) {
                      return 0;
                    }
                    return prev + 1;
                  })
                }
                icon={<ArrowIcon />}
              />
            </Tooltip>
          </Flex>
          <div />
        </Flex>
      </Card.Body>
    </Card>
  );
};

export default Callstack;
