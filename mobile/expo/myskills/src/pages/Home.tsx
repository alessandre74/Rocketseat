import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Platform, FlatList } from 'react-native'
import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

interface SkillData {
  id: string
  name: string
}

export function Home() {
  const [newSkill, setNewSkill] = useState('')
  const [mySkills, setMySkilss] = useState<SkillData[]>([])
  const [useEffectExecutado, setUseEffectExecutado] = useState(0)
  const [gretting, setGretting] = useState('')

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setNewSkill(' ')
    setMySkilss([...mySkills, data])
  }

  function handleRemoveSkill(id: string) {
    setMySkilss([...mySkills.filter(skill => skill.id != id)])
  }

  useEffect(() => {
    setUseEffectExecutado(useEffectExecutado + 1)
    const currentHour = new Date().getHours()

    if (currentHour < 12) {
      setGretting('Bom dia')
    }

    if (currentHour >= 12 && currentHour <= 18) {
      setGretting('Boa tarde')
    }
  }, [])

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, Alessandre</Text>

        <Text style={[styles.gretting]}>{gretting}</Text>

        <TextInput
          style={styles.input}
          placeholder="New skill"
          placeholderTextColor="#555"
          onChangeText={setNewSkill}
          value={newSkill}
        />

        <Button onPress={handleAddNewSkill} title="Add" />

        <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>

        <FlatList
          data={mySkills}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <SkillCard skill={item.name} onPress={() => handleRemoveSkill(item.id)} />
          )}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  gretting: {
    color: '#A370F7',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  }
})
