import React,{ Component } from 'react'
import {
    View,
    Animated,
    Text,
    Button,
    StyleSheet,
    Dimensions
} from 'react-native'

export default class Toast extends Component{
    constructor(props){
        super(props)
        this.state = {
            render:false
        }
        this.animatedValue=new Animated.Value(1)
        
       
    }
    
    static show(){
        console.log(this.obj.state.render);
        
        //this.toastInstance.showToast()
    }
    showToast(){
        //this.setState({render:true})
        Animated.timing(
            this.animatedValue,
            {
                toValue:-100,
                duration:200
            }
        ).start()
    }

    hideToast(){
        Animated.timing(
            this.animatedValue,
            {
                toValue:0,
                duration:200
            }
        ).start()
    }

    render(){

            return(
                <Animated.View 
                    style={
                        [
                            styles.alert,
                            {position:'absolute',transform:[{translateY : this.animatedValue}]}
                        ]
                    }
                >
                    <View style={{width:Dimensions.get('window').width,elevation:150}}>
                        <Text>Alert</Text>
                        <Button
                            onPress={()=>{
                                this.hideToast()
                            }}
                            title="OK"
                        />
                        
                        
                    </View>
                </Animated.View >
                )
        
        
    }
}

const styles = StyleSheet.create({
    alert:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        width:Dimensions.get('window').width,
        height:100,
        zIndex:100,
        elevation:100,
        opacity:1
    },
    alertContent:{
        opacity:1
    }
})