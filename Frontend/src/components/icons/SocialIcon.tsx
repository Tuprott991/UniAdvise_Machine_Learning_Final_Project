import { Link, Icon } from '@chakra-ui/react';
import { ComponentType } from 'react';

interface SocialIconProps {
    url: string;
    icon: ComponentType<any>;
    width?: number;
    height?: number;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ url, icon, width = 5, height = 5 }) => {
    return (
        <Link href={url}>
            <Icon as={icon} w={width} h={height} />
        </Link>

    )
};