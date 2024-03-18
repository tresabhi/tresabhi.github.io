import {
  FileIcon,
  GlobeIcon,
  ImageIcon,
  MixIcon,
  MobileIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { ComponentChild } from 'preact';
import { create } from 'zustand';

export enum ProjectType {
  App,
  ResourcePack,
  Library,
  // Bot,
  Social,
  Website,
  Miscellaneous,
}

export const PROJECT_TYPE_NAMES: Record<ProjectType, string> = {
  [ProjectType.ResourcePack]: 'Resource pack',
  // [ProjectType.Bot]: 'Bot',
  [ProjectType.App]: 'App',
  [ProjectType.Miscellaneous]: 'Miscellaneous',
  [ProjectType.Social]: 'Social',
  [ProjectType.Library]: 'Library',
  [ProjectType.Website]: 'Website',
};
export const PROJECT_TYPE_NAMES_PLURAL: Record<ProjectType, string> = {
  [ProjectType.ResourcePack]: 'Resource packs',
  // [ProjectType.Bot]: 'Bots',
  [ProjectType.App]: 'Apps',
  [ProjectType.Miscellaneous]: 'Miscellaneous',
  [ProjectType.Social]: 'Social',
  [ProjectType.Library]: 'Libraries',
  [ProjectType.Website]: 'Websites',
};
export const PROJECT_TYPE_ICONS: Record<ProjectType, ComponentChild> = {
  [ProjectType.ResourcePack]: <ImageIcon />,
  // [ProjectType.Bot]: <ChatBubbleIcon />,
  [ProjectType.App]: <MobileIcon />,
  [ProjectType.Miscellaneous]: <MixIcon />,
  [ProjectType.Social]: <PersonIcon />,
  [ProjectType.Library]: <FileIcon />,
  [ProjectType.Website]: <GlobeIcon />,
};

export interface UseApp {
  projectType?: ProjectType;
  showProjects: boolean;
}

const defaultApp: UseApp = {
  projectType: undefined,
  showProjects: location.hash === '#projects',
};

export const useApp = create<UseApp>(() => defaultApp);

window.addEventListener('hashchange', () => {
  useApp.setState({ showProjects: location.hash === '#projects' });
});
