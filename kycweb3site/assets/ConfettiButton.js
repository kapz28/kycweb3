import React from 'react';
import { Button } from '@nextui-org/react';
import confetti from 'canvas-confetti';

const ConfettiButton = () => {
  const handleConfetti = () => {
    console.log("HEllo");
    confetti({});
  };

  return (
    <Button
      auto
      rounded
      ripple={false}
      size="xl"
      onClick={handleConfetti}
      css={{
        background: '$white',
        fontWeight: '$semibold',
        boxShadow: '$md',
        position: 'relative',
        overflow: 'visible',
        color: '#0F9549',
        px: '$18',
        '&:after': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
        //   justifyContent: 'center',
        //   alignItems: 'center',
          background: '$white',
          opacity: 1,
          borderRadius: '$pill',
          transition: 'all 0.4s ease',
          textAlign:'center'
        },
        '&:hover': {
          transform: 'translateY(-5px)',
          '&:after': {
            transform: 'scaleX(1.5) scaleY(1.6)',
            opacity: 0
          }
        },
        '&:active': {
          transform: 'translateY(-2px)'
        }
      }}
    >
      Sign up 
    </Button>
  );
};

export default ConfettiButton;