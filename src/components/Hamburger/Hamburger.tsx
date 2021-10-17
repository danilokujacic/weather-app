import { Spin as Hamburger } from 'hamburger-react';
import { FC } from 'react';
interface IHamburgerComponentProps {
    onClick: Function;
    isOpen: boolean;
}

const HamburgerComponent: FC<IHamburgerComponentProps> = ({
    onClick,
    isOpen,
}) => {
    const toggleIsOpen = () => {
        onClick();
    };
    return (
        <Hamburger
            toggle={toggleIsOpen}
            color='white'
            size={20}
            toggled={isOpen}
        />
    );
};

export default HamburgerComponent;
