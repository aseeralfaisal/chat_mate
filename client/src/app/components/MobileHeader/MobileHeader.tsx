"use client";

import { faBars, faPlus } from '@icons';
import { Button } from '@lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { MobileHeaderProps } from './MobileHeader.types';

const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSidebar }) => {
  return (
    <div className="md:hidden flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      <Button isIconOnly size="sm" variant="light" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <h1 className="text-xl font-bold">Chat</h1>
      <Button isIconOnly size="sm" variant="light">
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  )
}

export default MobileHeader
