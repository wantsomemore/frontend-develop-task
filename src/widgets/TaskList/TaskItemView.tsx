import React, { memo, useCallback } from 'react'

import { ITask } from 'app/types/ITask'

import { Text, Card, Pressable, View } from 'app/ds'
import colors from 'app/theme/colors'

const TaskItemView: React.FC<{
  task: ITask
  onPress: (task: ITask) => void
  completed: boolean
}> = ({ task, onPress, completed }) => {
  return (
    <Pressable onPress={useCallback(() => onPress(task), [onPress, task])}>
      <Card
        my={4}
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <View style={{ maxWidth: 300 }}>
          <Text typeface='default/14' color='default' mb={2}>
            {task.name}
          </Text>
          <Text typeface='default/12' color='dimmed'>
            {task.description}
          </Text>
        </View>
        <View
          style={{
            height: 20,
            width: 20,
            borderWidth: 1,
            borderColor: colors.card.border,
            backgroundColor: completed ? colors.primary.main : colors.primary.contrast, // Set background color based on completion status
            borderRadius: 50
          }}
        />
      </Card>
    </Pressable>
  )
}

export default memo(TaskItemView)
