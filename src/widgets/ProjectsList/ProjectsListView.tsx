import React, { useCallback } from 'react'
import { FlatList } from 'react-native'

import { IProject } from 'app/types/IProject'

import { Header } from 'app/ds'

import ProjectItemView from './ProjectItemView'
import styles from './ProjectsListView.styles'

export const ProjectsListView: React.FC<{
  projects: IProject[]
  activeProject: IProject | null | undefined
  onProjectPress: (project: IProject) => void
}> = ({ projects, activeProject, onProjectPress }) => {
  const renderItem = useCallback(
    ({ item }: { item: IProject }) => (
      <ProjectItemView
        project={item}
        isActive={activeProject?.name === item.name}
        onPress={onProjectPress}
      />
    ),
    [activeProject?.name, onProjectPress]
  )

  return (
    <FlatList
      data={projects}
      ListHeaderComponent={<Header mb={12}>Projects</Header>}
      renderItem={renderItem}
      style={styles.list}
    />
  )
}
