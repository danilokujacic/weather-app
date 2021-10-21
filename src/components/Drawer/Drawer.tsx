import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import HamburgerComponent from '../Hamburger/Hamburger';
import MobileNav from '../NavMenu/Mobile';

const rollIn = keyframes`
    from {
        height:0%;
    }
    to{
        height:100%;
    }
`;
const rollOut = keyframes`
    from {
        height:100%;
    }
    to{
        height:0%;
    }
`;

const rootPortal = document.createElement('div');

const HamburgerHolder = styled.div`
    position: absolute;
    right: 8px;
    top: 8px;
`;

const Drawer: FC<any> = ({ isOpen, handleClose }) => {
    const DrawerContainer = styled.div`
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 5;
        overflow: hidden;
        animation: ${isOpen ? rollIn : rollOut} ${isOpen ? '0.3' : '0.3'}s
            ${isOpen ? 'ease-out' : 'ease-in'} forwards;
    `;

    useEffect(() => {
        if (isOpen) {
            document.body.appendChild(rootPortal);
        }
    }, [isOpen]);
    return createPortal(
        <DrawerContainer className='bg-blue-300'>
            <HamburgerHolder>
                <HamburgerComponent isOpen={isOpen} onClick={handleClose} />
            </HamburgerHolder>
            <MobileNav handleClose={handleClose} />
        </DrawerContainer>,
        rootPortal,
    );
};

export default Drawer;
