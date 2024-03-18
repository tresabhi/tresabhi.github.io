import { projects } from 'constants/projects';
import { Ref } from 'preact';
import { Search, SearchItem } from 'react-fuzzysort';
import { styled, theme } from 'stitches.config';
import {
  PROJECT_TYPE_ICONS,
  PROJECT_TYPE_NAMES,
  ProjectType,
  useApp,
} from 'stores/app';

export interface Projects {
  input: Ref<HTMLInputElement>;
}

const Container = styled('div', {
  display: 'grid',
  gap: theme.space.gapUnrelatedRegular,
  gridTemplateColumns: 'repeat(1, 1fr)',
  overflowY: 'scroll',
  paddingBottom: '2rem',
  gridAutoRows: '10rem',
  transition: theme.transitions.regular,

  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '@twoRowSearch': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  variants: {
    expanded: {
      true: {
        flex: 1,
        opacity: 1,
      },
      false: {
        flex: 0,
        opacity: 0,
      },
    },
  },
});
const Item = styled('div', {
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.colors.componentInteractive_glass,
  borderRadius: theme.radii.regular,
  border: theme.borderStyles.nonInteractive_glass,
});
const Content = styled('div', {
  display: 'flex',
  boxSizing: 'border-box',
  padding: theme.space.paddingMajor,
  gap: theme.space.gapUnrelatedMajor,
  flex: 1,
});
const Icon = styled('img', {
  width: '4rem',
  height: '4rem',
  objectFit: 'contain',
});
const Info = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  fontSize: theme.fontSizes.paragraph,
  gap: theme.space.gapRelatedRegular,
  overflow: 'hidden',
});
const Title = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: theme.space.gapRelatedMajor,
});
const Name = styled('span', {
  color: theme.colors.textHighContrast_glass,
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  minWidth: 0,
  maxWidth: '12rem',
});
const Type = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space.gapRelatedRegular,
  color: theme.colors.textLowContrast_glass,
  fontSize: theme.fontSizes.label,

  '& svg': {
    width: '1em',
    height: '1em',
  },
});
const Description = styled('span', {
  color: theme.colors.textLowContrast_glass,
});
const Actions = styled('div', {
  display: 'flex',
  borderTop: theme.borderStyles.nonInteractive_glass,
});
const Action = styled('a', {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space.gapRelatedRegular,
  color: theme.colors.textLowContrast_glass,
  textDecoration: 'none',
  padding: theme.space.paddingRegular,
  transition: theme.transitions.regular,

  '&:hover': {
    backgroundColor: theme.colors.componentInteractiveHover_glass,
  },
  '& + &': {
    borderLeft: theme.borderStyles.nonInteractive_glass,
  },
});

export function Projects({ input }: Projects) {
  const currentType = useApp((state) => state.projectType);
  const showProjects = useApp((state) => state.showProjects);

  return (
    <Container expanded={showProjects}>
      <Search
        key={currentType}
        input={input}
        list={projects
          .filter(
            (project) =>
              currentType === undefined || project.type === currentType,
          )
          .map(
            (project) =>
              ({
                query: `${project.name} ${project.description} ${
                  ProjectType[project.type]
                } ${
                  project.links
                    ? project.links.map((link) => `${link.label} ${link.url}`)
                    : ''
                }`,
                node: (
                  <Item>
                    <Content>
                      <Info>
                        <Title>
                          <Name>{project.name}</Name>
                          <Type>
                            {PROJECT_TYPE_ICONS[project.type]}
                            {PROJECT_TYPE_NAMES[project.type]}
                          </Type>
                        </Title>

                        <Description>{project.description}</Description>
                      </Info>

                      {project.icon !== undefined && (
                        <Icon src={project.icon} />
                      )}
                    </Content>

                    {project.links !== undefined && (
                      <Actions>
                        {project.links.map((action) => (
                          <Action
                            href={action.url}
                            target={action.target}
                            key={action.url}
                          >
                            {action.icon}
                            {action.label}
                          </Action>
                        ))}
                      </Actions>
                    )}
                  </Item>
                ),
              } satisfies SearchItem),
          )}
      />
    </Container>
  );
}
