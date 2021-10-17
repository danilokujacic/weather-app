import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { INavMenuConfig } from '../../config/navMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const fadeIn = keyframes`
    from {
        opacity:0;
    }
    to {
        opacity: 1;
    }
`;

const AnimatedLink: FC<INavMenuConfig & { index: number; onClick: any }> = ({
    name,
    path,
    index,
    icon,
    onClick,
}) => {
    const AnimatedContainer = styled.div`
        opacity: 0;
        animation: ${fadeIn} 0.3s ease-out forwards ${(index + 1) / 2}s;
    `;

    return (
        <AnimatedContainer onClick={onClick}>
            <NavLink
                to={path}
                activeClassName='text-pink-500'
                className='flex items-center block h-16 text-white hover:text-pink-500'
                exact>
                <FontAwesomeIcon size='2x' icon={icon} />
                <span className='text-xl  font-semibold ml-4'>{name}</span>
            </NavLink>
        </AnimatedContainer>
    );
};

export default AnimatedLink;
