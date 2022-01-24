import React, {useState, useEffect} from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './Components/tasks';
import { AsyncStorage } from 'react-native';

let arr = [];

export default function App() {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = React.useState('');

  let storeTask = async () => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(arr));
    } catch (error) {
      //Error for savind Data
      Alert.alert("error", "storing data in local storage", [
        {
          text: "cancel",
          onPress: () => console.log("Cancel is Pressed"),
          style: "cancel",
        },
        { text: "ok", onPress: () => console.log("OK is Pressed") },
      ]);
    }
  };

  let getTask = async () => {
    try {
      let value = await AsyncStorage.getItem("task");
      if (value !== null) {
        // We Get Data
        
        console.log("data", JSON.parse(value));
        value = JSON.parse(value)

        for( let i=0; i<value.length; ++i) {
          todoItems[i] = value[i];
        }
        console.log("data", taskItems);
      }
    } catch (error) {
      // Error for retrieving data
      Alert.alert("error", "retrieving data from local storage", [
        {
          text: "cancel",
          onPress: () => console.log("Cancel is Pressed"),
          style: "cancel",
        },
        { text: "ok", onPress: () => console.log("OK is Pressed") },
      ]);
    }
  };

  const addTask = () => {
    arr.push({
      Title: title,
      Description: desc,
    });

    storeTask();
    
    setTitle(null);
    setDesc(null);
  };

  const findNotes = async () => {

    const result = await AsyncStorage.getItem('notes');
    console.log(result)
    if(result != null) setNotes(JSON.parse(result));

  }

  useEffect(() => {
    findNotes();
      getTask();
  }, []);

  const handleTask = async (title, desc) => {
    // setTaskItems([...taskItems, task]) // what ever is in taskItems array and it will appends in New task.
    // //setTaskItems(null);
    const note = {title, desc};
    const updateNotes = [...notes, note];
    setNotes(updateNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(updateNotes))
  }

  const Del = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

  const searchRes = (search) => {
    const searList = []
    const addItem = []
    taskItems.map((item, index) => {
      if (item[0].includes(search) && !addItem.includes(item[0])) {
        console.log(addItem)
        console.log(item[0])
        addItem.push(item[0])
        searList.push(<TouchableOpacity key={index} onPress={() => 
          JSON.parse(item[1])['isComp'] ? null : 
          navigation.navigate('CompTask', { title: item[0], 
          desc: JSON.parse(item[1])['desc'], isComp: 
          JSON.parse(item[1])['isComp'] })}>
          <Task title={item[0]} desc={JSON.parse(item[1])['desc']} 
          isComp={JSON.parse(item[1])['isComp']} />
        </TouchableOpacity>)
      }
    })
    return searList;
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.tasks}>
        <Text style={styles.title}>Tasks!</Text>
        <TextInput label="Search Task"
          value={search}
          onChangeText={text => setSearch(text)}
        />

        <ScrollView style={styles.items}>
          {

            taskItems.map((item, index) => {
              return(
                <TouchableOpacity key={index} onPress={() => Del(index)}>
                  <Task onGetTodo={getTask} title={item.title} desc={item.desc}/>
                  {/* <Task text={item} /> */}
                </TouchableOpacity>
                ) 
            })

          }
        </ScrollView>

      </View>

      <View style={styles.writeTaskBar}>
        
        <TextInput style={styles.input} 
        placeholder={'Write a Title'} value={task} onChangeText={text => setTitle(text)}/>

        <TextInput style={styles.input} 
        placeholder={'Write a Task'} value={task} onChangeText={text => setDesc(text)}/>

        <TouchableOpacity onPress={() => addTask()}>
          <View style={styles.addCircle}>
            <Text style={styles.add}>+</Text>
          </View>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasks: {
    paddingTop: 80,
    paddingHorizontal: 20,
    height: '80%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
writeTaskBar: {
  position: 'absolute',
  bottom: 30,
  width: '100%',
  alignItems: 'center',
},
input: {
  paddingVertical: 15,
  paddingHorizontal: 15,
  backgroundColor: '#FFF',
  borderRadius: 60,
  margin: 2,
  borderColor: '#C0C0C0',
  borderWidth: 2,
  width: 300,
},
addCircle: {
  width: 60,
  height: 60,
  backgroundColor: '#55BCF6',
  borderRadius: 60,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#C0C0C0',
  borderWidth: 2,

}
});
