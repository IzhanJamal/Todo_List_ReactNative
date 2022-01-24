import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Task = ({item}) => {
    const {title, desc, isComp} = item;
    return (

        <View style={styles.items}>

               <View style={styles.itemleft}>
                 <View style={styles.square}></View>
                 <Text style={styles.itemText}>{title}, {desc}</Text>
               </View>
               
               <TouchableOpacity style={{size:27}}
                onPrss={() => {
                    toggComplete();
                    navigation.goBack();
                    }}>

               </TouchableOpacity>
        </View>
    )

    const toggComplete = async () => {
        const data = { 'desc': `${desc}`, 'isComp': `${!isComp}` }
        try {
            const jsonData = JSON.stringify(data)
            await AsyncStorage.setItem(title, jsonData)
        } catch (e) {
        }
    }
}

const styles= StyleSheet.create({
items :{
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop : 20,
},
itemleft :{
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
},
square :{
    width: 24, 
    height: 24, 
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
},
itemText :{
    maxWidth: '80%',
},
});

export default Task;
