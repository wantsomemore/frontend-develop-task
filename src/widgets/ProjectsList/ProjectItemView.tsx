import React, { memo, useCallback } from 'react'

import { IProject } from 'app/types/IProject'

import { Text, Card, Pressable } from 'app/ds'
import colors from 'app/theme/colors'

const ProjectItemView: React.FC<{
  project: IProject
  isActive: boolean
  onPress: (project: IProject) => void
}> = ({ project, isActive, onPress }) => {
  return (
    <Pressable onPress={useCallback(() => onPress(project), [onPress, project])}>
      <Card my={4} style={isActive && { borderColor: colors.card.borderSelected }}>
        <Text typeface='default/14' color='default' mb={2}>
          {project.name}
        </Text>
        <Text typeface='default/12' color='dimmed'>
          {project.description}
        </Text>
      </Card>
    </Pressable>
  )
}

export default memo(ProjectItemView)
