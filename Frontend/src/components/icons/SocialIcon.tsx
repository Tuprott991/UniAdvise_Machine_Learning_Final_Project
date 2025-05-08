import { Link, Icon } from '@chakra-ui/react';
import { ComponentType } from 'react';

/**
 * Props for the SocialIcon component.
 * 
 * @interface SocialIconProps
 * @property {string} url - The URL the icon should link to.
 * @property {ComponentType<any>} icon - The icon component to be used (e.g., from `react-icons`).
 * @property {number} [width=5] - The width of the icon (default is 5).
 * @property {number} [height=5] - The height of the icon (default is 5).
 */
interface SocialIconProps {
    url: string;
    icon: ComponentType<any>;
    width?: number;
    height?: number;
}

/**
 * A functional component that renders a social media icon wrapped in a link.
 * 
 * @component
 * @example
 * // Example usage
 * <SocialIcon url="https://github.com" icon={FaGithub} />
 * 
 * @param {SocialIconProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered JSX for the social icon component.
 */
export const SocialIcon: React.FC<SocialIconProps> = ({ url, icon, width = 5, height = 5 }) => {
    return (
        <Link href={url}>
            <Icon as={icon} w={width} h={height} />
        </Link>
    );
};
