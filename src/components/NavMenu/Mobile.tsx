import styled from '@emotion/styled';
import { FC } from 'react';
import navMenuConfig, { INavMenuConfig } from '../../config/navMenu';
import AnimatedLink from './AnimatedLink';

const NavContainer = styled.div`
    position: absolute;
    left: 40%;
    top: 40%;
    transform: translate(-40%, -40%);
`;

const MobileNav: FC<{ handleClose: Function }> = ({ handleClose }) => {
    return (
        <NavContainer className='flex flex-col'>
            {navMenuConfig.map((item: INavMenuConfig, index: number) => (
                <AnimatedLink
                    key={index}
                    onClick={handleClose}
                    {...item}
                    index={index}
                />
            ))}
        </NavContainer>
    );
};

export default MobileNav;
