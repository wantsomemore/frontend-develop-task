import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'

import { IProject } from 'app/types/IProject'
import { ProjectsListView } from 'app/widgets/ProjectsList'
import { PROJECTS } from 'app/mock/data'

import styles from './App.styles'
import { TasksListView } from './widgets/TaskList'
import { ITask } from './types/ITask'

function App() {
  const allTasks = PROJECTS.flatMap(project => project.tasks.map(task => task))

  const [activeProject, setActiveProject] = useState<IProject | null>()
  const [tasks, setTasks] = useState<ITask[]>(allTasks)
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([])

  const onProjectPress = useCallback(
    (selectedProject: IProject) => {
      // Check if the selected project is already active
      const isAlreadySelected = activeProject && selectedProject.name === activeProject.name

      if (isAlreadySelected) {
        setActiveProject(null)
        setTasks(allTasks)
      } else {
        const project = PROJECTS.find(project => project.name === selectedProject.name)
        if (project) {
          setActiveProject(project)
          setTasks(project.tasks)
        }
      }
    },
    [setActiveProject, setTasks, allTasks, PROJECTS]
  )

  const onTaskPress = useCallback(
    (task: ITask) => {
      // Check if the task is already completed
      const isCompleted = completedTasks.some(completedTask => completedTask.name === task.name)

      if (isCompleted) {
        // If it's completed, remove it from the completedTasks array
        setCompletedTasks(prevCompletedTasks =>
          prevCompletedTasks.filter(prevTask => prevTask.name !== task.name)
        )
      } else {
        // If it's not completed, add it to the completedTasks array
        setCompletedTasks(prevCompletedTasks => [...prevCompletedTasks, task])
      }
    },
    [completedTasks, setCompletedTasks]
  )
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <ProjectsListView
          projects={PROJECTS}
          activeProject={activeProject}
          onProjectPress={onProjectPress}
        />
        <TasksListView
          tasks={tasks}
          activeProject={activeProject}
          completedTasks={completedTasks}
          onTaskPress={onTaskPress}
        />
      </View>
    </View>
  )
}

export default App
