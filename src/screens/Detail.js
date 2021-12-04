import React,{useState,useEffect} from 'react'
import { View,StyleSheet, Text,Image, TouchableOpacity,TextInput, ScrollView,Dimensions } from 'react-native'
import { useSelector, useDispatch } from "react-redux";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function Detail({ navigation, route }) {

    const { data } = route.params;
    const dispatch = useDispatch();
    
    const [priceDetail, setPriceDetail] = useState(data?.price)
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setTotal(priceDetail * quantity) 
    }, [quantity]);

    const onAddCart = () => {
        dispatch({ type: "ADD_TO_CART", data: { ...data, quantity: quantity } });
    }

    return (
        <View style={styles.detail}>
            <ScrollView
                style={{marginBottom:120}}
            >
                <View style={styles.thumbnail}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            data?.images?.map((item, index) => {
                                return(
                                    <Image
                                        style={
                                            data?.images?.length === 1 ? styles.imageSingle : styles.image
                                        }
                                        key={index}
                                        source={{
                                        uri: item,
                                    }} />
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View style={[styles.container, styles.content]}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{data?.name}</Text>
                        <TouchableOpacity
                            style={{flex:1, alignItems:'flex-end'}}
                        >
                            <Image style={styles.icon} source={require('../../images/icons/heart.png')} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.price}>{priceDetail}đ</Text>
                    <Text numberOfLines={2} style={styles.intro}>{data?.description}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.titleRequest}>Yeu cau khac</Text>
                    <Text style={styles.text}>Nhung tuy chon khac</Text>
                    <TextInput
                        placeholder="Them ghi chu"
                        style={styles.input}
                    />
                </View>
            </ScrollView>
            <View style={styles.positionBox}>
                <View style={styles.quantityS}>
                    <TouchableOpacity
                        style={styles.iconWrapper}
                        onPress={() => {
                            quantity > 1 && setQuantity( quantity - 1 )
                        }}
                    >
                        <Image style={styles.iconQuantity} source={require('../../images/icons/minus.png')} />
                    </TouchableOpacity>
                    <Text style={styles.value}>{quantity}</Text>
                    <TouchableOpacity
                        style={styles.iconWrapper}
                        onPress={() => setQuantity( quantity + 1 )}
                    >
                        <Image style={styles.iconQuantity} source={require('../../images/icons/add.png')} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={onAddCart}
                >
                    <Text style={styles.btnText}>Chon san pham - {total}đ</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {paddingVertical: 15,paddingHorizontal: 15, width:"100%"},
    detail: {
        flex:1,
        backgroundColor:'#fff'
    },
    thumbnail: {
        height:HEIGHT / 2,
        width: WIDTH,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    image: {
        width: WIDTH * 0.8 - 1,
        height:'100%',
        resizeMode:'cover',
        marginHorizontal:1
    },
    imageSingle: {
        width: WIDTH,
        height:'100%',
        resizeMode:'cover',
        marginHorizontal:2
    },
    titleWrapper: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    content: {
        borderBottomColor:'#EDEDED',
        borderBottomWidth:6
    },
    title: {
        fontSize:22,
        fontWeight:'700',
        textTransform:'capitalize',
        flex:5
    },
    icon: {
        width:24,
        height:24
    },
    iconQuantity: {
        width:16,
        height:16
    },
    price: {
        fontSize:16,
        marginVertical:5
    },
    titleRequest: {
        fontSize:20,
        fontWeight:'700',
    },
    input: {
        paddingHorizontal:15,
        marginVertical:10,
        borderColor:'#ccc',
        borderWidth:1,
        borderRadius:10,
        fontSize:15
    },
    positionBox: {
        position:'absolute',
        bottom:0,
        width:WIDTH,
        backgroundColor:'#fff',
        paddingHorizontal:15,
    },
    quantityS: {
        flexDirection:'row',
        justifyContent:'center'
    },
    value: {
        fontSize:22,
        fontWeight:'900',
        marginHorizontal:15
    },
    iconWrapper: {
        padding:10,
        backgroundColor:'#E4E4E4',
        borderRadius:10
    },
    btn: {
        paddingVertical:15,
        marginVertical:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#EB7C04',
        borderRadius:10
    },
    btnText: {
        color:'#fff',
        fontSize:17,
        fontWeight:'600'
    }
});