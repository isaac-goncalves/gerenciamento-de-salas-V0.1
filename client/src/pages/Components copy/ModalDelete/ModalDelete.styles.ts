import styled from 'styled-components';

import { Colors } from '../../../colors';

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  animation: appear 0.8s;
    @keyframes appear {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
`;