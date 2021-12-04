import React,{useState, useEffect} from 'react'
import { Dimensions, Image,  View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
const WIDTH = Dimensions.get('window').width;

import { useSelector, useDispatch } from "react-redux";

export default function Bag() {

    const [allTotal, setAllTotal] = useState(0)
    const listItem = useSelector((store) => store.cartReducer.cart);
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Text>Xóa</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Xác nhận đơn hàng</Text>
                    <TouchableOpacity>
                        <Ionicons name="close-outline" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <View style={styles.headerContent}>
                        <Text style={styles.titleContent}>Tự đến lấy hàng</Text>
                        <TouchableOpacity>
                            <Text style={styles.btnContent}>Thay đổi</Text>
                        </TouchableOpacity>
                    </View>

                    <View >
                        <TouchableOpacity>
                            <Ionicons name="chevron-forward-outline" size={20} color="#000" style={styles.rightArrow} />    
                            <Text style={styles.address}>
                                Chung cư Victoria Văn Phú tòa V2 khu đô thị Văn Phú, Hà Đông, Hà Nội, Việt Nam
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}></View>
                    <View>
                        <TouchableOpacity>
                            <Text>Ngày mai</Text>
                            <Text style={{color: '#000'}}>Sớm nhất có thể</Text>
                            <Ionicons name="chevron-forward-outline" size={20} color="#000" style={[styles.rightArrow, {top: -24}]} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.headerContent}>
                        <Text style={styles.titleContent}>Sảm phẩm đã chọn</Text>
                        <TouchableOpacity>
                            <Text style={styles.btnContent}>+ Thêm</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        {!listItem?.length && <Text> Khong co san pham nao</Text>}
                        {listItem?.map(e => {
                            return(
                                <Item key={e?.id} item={e} />
                            )
                        })}
                    </View>
                </View>

                <View style={styles.content}>
                    <Text style={styles.titleContent}>Tổng cộng</Text>
                    <View>
                        <View style={{ paddingVertical: 16, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Thành tiền</Text>
                            <Text style={styles.price}>{allTotal}đ</Text>
                        </View>
                        <View style={styles.line}></View>
                        <TouchableOpacity>
                            <Ionicons name="chevron-forward-outline" size={20} color="#000" style={styles.rightArrow} />
                            <Text style={styles.select}>Chọn khuyến mãi</Text>
                        </TouchableOpacity>
                        <View style={styles.line}></View>
                        <View style={{ paddingVertical: 16, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Số tiền thanh toán</Text>
                            <Text style={styles.price}>{allTotal}đ</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.content}>
                    <Text style={styles.titleContent}>Thanh toán</Text>
                    <TouchableOpacity>
                        <Ionicons name="chevron-forward-outline" size={20} color="#000" style={styles.rightArrow} />    
                        <Text style={styles.select}>Chọn phương thức thanh toán</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoBooking}>
                    <View>
                        <Text style={styles.txtBooking}>Tự đến lấy • 3 sản phẩm</Text>
                        <Text style={styles.totalPrice}>{allTotal}đ</Text>
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.btnBooking}>đặt hàng</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

function Item({item}) { 
    const dispatch = useDispatch();
    const [total, setTotal] = useState( item?.quantity * item?.price )
    const onDelCart = () => {
        dispatch({ type: "REMOVE_CART", data: item });
    }
    return(
        <TouchableOpacity key={item?.id} style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
                <Ionicons name="pencil-outline" size={20} color="#FF7900" />
                <View style={{marginLeft: 16}}>
                    <Text numberOfLines={1} style={styles.text}>x{item?.quantity} {item?.name}</Text>
                    <Text>{item?.options?.item?.[0]}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{ marginRight:10}}>{total}đ</Text>
                <TouchableOpacity style={styles.delete} onPress={onDelCart}>
                    <Image 
                        source={require('../../images/icons/delete.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    icon: {
        width:20,
        height:20
    },
    content: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#FFF'
    },
    header: {
        padding: 16,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnContent: {
        padding: 8,
        paddingHorizontal: 16,
        color: '#FF7900',
        backgroundColor: '#fcbf49',
        fontWeight: 'bold',
        borderRadius: 16,
    },
    titleContent: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold'
    },
    address: {
        color: '#000',
        width: WIDTH*0.8
    },
    select: {
        color: '#0077b6',
    },
    rightArrow: {
        top: 21,
        alignSelf: 'flex-end',
    },
    infoBooking: {
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FF7900',
    },
    txtBooking: {
        color: '#FFF'
    },
    totalPrice: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    btnBooking: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: '#FFF',
        color: '#FF7900',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        borderRadius: 24,
    },
    line: {
        marginTop: 16,
        backgroundColor: '#CCC',
        width: WIDTH,
        height: 1,
    },
    text: {
        width:200
    },
})