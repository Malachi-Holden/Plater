import React, {Component} from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import calculatePlates from './calulator.js';
import CustomTextInput from './components/CustomTextInput.js';
import {storeList, getList} from './storage.js';

export default class CalculatorView extends Component{
  state = {
    plateList: [],
    desiredWeight: '',
    resultPlates: [],
    newPlate: ''
  };

  componentDidMount(){
    getList().then(array=>{
      if (!array) return;
      this.setState({plateList: array});
    });
  }

  componentWillUnmount(){
    storeList(this.state.plateList);
  }

  plateListData = ()=>this.state.plateList.map((item, index)=>({key: index.toString(), weight: item}));

  deleteWeight = (index)=>{
    this.setState({plateList: [...this.state.plateList.slice(0, index), ...this.state.plateList.slice(index+1)]});
    storeList(this.state.plateList);
  }

  renderPlate = ({item, index})=><View style={styles.plateItem}>
    <Text>{item.weight} lbs</Text>
    <Button title="delete" onPress={()=>this.deleteWeight(index)}/>
  </View>
  
  calculateWeights = ()=>this.setState({resultPlates: calculatePlates(this.state.plateList, parseInt(this.state.desiredWeight))});

  resultPlateViewList = ()=>this.state.resultPlates.map((item, index)=><Text key={index}>{parseInt(item)} lbs</Text>)

  addPlate = ()=>{
    let newWeight = parseInt(this.state.newPlate);
    let newIndex = this.sortedIndex(this.state.plateList, newWeight);
    let newPlateList = [...this.state.plateList.slice(0, newIndex), newWeight, ...this.state.plateList.slice(newIndex)];
    this.setState({plateList: newPlateList, newPlate: ''});
    storeList(newPlateList);
  }

   sortedIndex = (array, value)=> {
    let low = array.length;
    let high = 0;

    while (low > high) {
        var mid = (low + high) >>> 1;
        if (array[mid] > value){
          high = mid+1;
        } 
        else low = mid;
    }
    return high;
}

  render(){
    return (
      <View style={styles.container}>
        <CustomTextInput placeholder="Desired weight (e.g. 37)" onChangeText={text=>this.setState({desiredWeight: text})} style={styles.weightInput}/>
        <Button title="Calculate!" onPress={this.calculateWeights} />
        <View>{this.resultPlateViewList()}</View>
        <FlatList
          style={styles.plateList}
          data={this.plateListData()}
          renderItem={this.renderPlate}
        />
        <CustomTextInput value={this.state.newPlate} placeholder="Plate weight" onChangeText={text=>this.setState({newPlate: text})} style={styles.newPlateInput} />
        <TouchableOpacity onPress={this.addPlate} style={{marginBottom: 100}}>
          <Text style={styles.newPlateButton}>Add Plate</Text>
        </TouchableOpacity>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  plateList: {
    marginTop: 30,
    width: '70%'
  },

  weightInput: {
    height: 'auto',
    width:'70%',
    marginTop: 50,
    marginBottom: 10,
    fontSize: 26
  },

  newPlateInput: {
    height: 'auto',
    width:'70%',
    marginTop: 20,
    fontSize: 26
  },

  newPlateButton:{
    color: 'blue',
    fontSize: 20
  },

  plateItem: {
    flexDirection: 'row'
  }
});