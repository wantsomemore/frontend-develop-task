import React, { useCallback } from 'react'
import { FlatList } from 'react-native'

import { Header } from 'app/ds'

import TaskItemView from './TaskItemView'
import styles from '../ProjectsList/ProjectsListView.styles'
import { ITask } from 'app/types/ITask'
import { IProject } from 'app/types/IProject'

export const TasksListView: React.FC<{
  tasks: ITask[]
  completedTasks: ITask[]
  activeProject: IProject | null | undefined
  onTaskPress: (project: ITask) => void
}> = ({ tasks, completedTasks, activeProject, onTaskPress }) => {
  const renderItem = useCallback(
    ({ item }: { item: ITask }) => {
      const completed = completedTasks.some(completedTask => completedTask.name === item.name)
      return <TaskItemView task={item} onPress={onTaskPress} completed={completed} />
    },
    [onTaskPress, completedTasks]
  )

  const headerTitle = activeProject ? `Tasks for ${activeProject?.name}` : 'All Tasks'

  return (
    <FlatList
      data={tasks}
      ListHeaderComponent={<Header mb={12}>{headerTitle}</Header>}
      renderItem={renderItem}
      style={styles.list}
    />
  )
}
