import React, { Component, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity
} from "react-native";
import { connect } from 'react-redux'
import { useEffect } from "react";
import { Navigation } from "react-native-navigation";

const Cart = (props) => {
    const [cart, setCart] = useState(1)
    const checkOutItemHandler = (productId, productQuantity) => {
        // const newCart = cart.map(item => {
        //     if (item.id == productId) {
        //         item.quantity = productQuantity;
        //     }
        //     return item;
        // })

        // const filteredCart = newCart.filter(item => item.quantity > 0)
        setCart(productId);
        console.log(cart, 'data')
    }



    // const [quantity, setQuantity] = useState(1);
    // let totalPrice = 0;
    // let newtotalPrice = 0
    // for (let i = 0; i < cart.length; i++) {
    //     const product = cart[i];
    //     return newtotalPrice = totalPrice + (product.price * cart.quantity);
    // }

    // 
    let total = 0;
    for (let i = 0; i < props.cartItems.length; i++) {
        const product = props.cartItems[i];
        total = total + product.sale_price * product.quantity || 1;
    }
    console.log(props.cartItems)

    const pushCheckout = (details) => {
        Navigation.push(props.componentId, {
            component: {
                name: 'checkout',
                options: {
                    topBar: {
                        backButton: { color: '#ffffff' },
                        background: { color: '#0083c1' },
                        title: {
                            component: {
                                name: 'topbar'
                            }
                        },
                        rightButtons: {
                            id: 'cartIcon',
                            icon: require('../../assets/Shopping-Cart-icon.png')
                        },
                        sideMenu: {
                            left: {
                                visible: false
                            }
                        }
                    }
                }
            }

        })
    }


    const renderItem = ({ item }) => (
        <View style={{
            alignContent: 'center', backgroundColor: 'white', margin: 5, borderRadius: 10, paddingBottom: 10, padding: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
        }}>

            <View style={{ flexDirection: 'row', }}>
                <View>
                    <Image style={{ width: 80, height: 80, margin: 2, marginRight: 5 }} source={{ uri: `${item.images}` }} />
                </View>
                <View style={{ width: '100%' }} >
                    <Text style={styles.title}>{item.title.slice(0, 55)}...</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '76%', marginTop: 18 }}>
                        {
                            item.quantity <= 1 ? <TouchableOpacity style={{
                                backgroundColor: '#0083c1', height: 30, width: 35, borderBottomLeftRadius: 15,
                                borderTopLeftRadius: 15, justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>-</Text>
                            </TouchableOpacity> : <TouchableOpacity style={{
                                backgroundColor: '#0083c1', height: 30, width: 35, borderBottomLeftRadius: 15,
                                borderTopLeftRadius: 15, justifyContent: 'center', alignItems: 'center'
                            }}
                                onClick={() => checkOutItemHandler(item.id, (item.quantity - 1))}
                            >
                                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>-</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity style={{ backgroundColor: 'white', height: 30, width: 50, justifyContent: 'center', alignItems: 'center', borderColor: '#ddd', borderWidth: 1, }}>
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>{item.quantity}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: '#0083c1', height: 30, width: 35, justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 15,
                            borderTopRightRadius: 15,
                        }}
                            // onPress={() => setQuantity(quantity + 1)}
                            onClick={() => checkOutItemHandler(item.id, (item.quantity + 1))}
                        >
                            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>+</Text>
                        </TouchableOpacity>
                        <View style={{ height: '80%', width: 1, backgroundColor: 'gray', marginLeft: 30, marginTop: 5, marginRight: 10 }}></View>
                        <TouchableOpacity onPress={() => props.removeItem(item)} style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Image style={{ width: 35, height: 35 }} source={require('../../assets/cancel.png')} tintColor="#70C9F6" />
                            {/* <Text style={{ color: 'blue', fontSize: 16 }}>Remove</Text> */}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 }}>
                <View style={{ marginLeft: 5 }}>
                    <Text style={{ color: '#0083c1', fontSize: 16 }}>৳: <Text style={{ color: '#0083c1', fontSize: 16, fontWeight: 'bold' }}>{item.quantity * item.sale_price.toFixed(2)}</Text> ({item.quantity}x{item.sale_price.toFixed(0)})  </Text>
                    {/* <Text style={{ color: 'grey', fontSize: 16, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>৳{item.regular_price}</Text> */}
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ color: 'grey', fontSize: 16, textDecorationStyle: 'solid', }}>৳: <Text style={{ color: 'grey', fontSize: 16, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{item.regular_price}</Text></Text>
                    <Text style={{ color: 'red', fontSize: 16, marginHorizontal: 5 }}>{item.cat_discount_percentage}%Off</Text>
                </View>

            </View>

        </View>

    );

    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                data={props.cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

            <View style={{
                alignContent: 'center', backgroundColor: 'white', margin: 5, borderRadius: 10, paddingBottom: 10, padding: 10,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 0 }}>
                    <Text > Delivery Type : regular (12 Hours)</Text>
                    {/* <Text > Deliver</Text> */}

                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2', marginHorizontal: 10, borderRadius: 10, padding: 5, marginTop: 15 }}>
                <Text style={{ color: '#0785C4', fontSize: 14, fontStyle: 'italic' }}> You are saving <Text style={{ fontWeight: 'bold' }}>৳271</Text> in this order. </Text>
                {/* <Text style={{ color: 'blue', fontSize: 16 }}> = {total.toFixed(2)}</Text> */}
            </View>
            <View style={{
                alignContent: 'center', backgroundColor: 'white', margin: 5, borderRadius: 10, paddingBottom: 10, padding: 10,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, paddingVertical: 3, }}>
                    <Text >Subtotal</Text>
                    <Text> ৳ {total.toFixed(2)}</Text>

                </View>


                <View style={{
                    height: 2, borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed'
                }} />



                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, paddingVertical: 3 }}>
                    <Text>Discount applied</Text>
                    <Text> -৳ {total.toFixed(2)}</Text>
                </View>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, paddingVertical: 3 }}>
                    <Text>Delivery charge (Inside Dhaka City)</Text>
                    <Text> ৳50</Text>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, paddingVertical: 3 }}>
                    <Text style={{fontSize: 14, fontStyle:'italic',color: 'gray'}}>To get free delivery order more than ৳999</Text>
                    {/* <Text> -৳ {total.toFixed(2)}</Text> */}
                </View>

                <View style={{
                    height: 2, borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed'
                }} />


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, paddingVertical: 3 }}>
                    <Text style={{ fontWeight: 'bold' }}>Amount payable</Text>
                    <Text style={{ fontWeight: 'bold' }}> ৳ {total.toFixed(2)}</Text>
                </View>
            </View>

            <View style={{ backgroundColor: '#0083c1', flexDirection: "row", justifyContent: "space-around" }}>
                <TouchableOpacity onPress={() => pushCheckout()} style={{
                    backgroundColor: '#0083c1', height: 35, width: 120, justifyContent: 'center', alignItems: 'center', borderRadius: 15,
                }}
                >
                    <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>Call To Support</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pushCheckout()} style={{
                    backgroundColor: '#0083c1', height: 35, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 15,
                }}>
                    <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

//  -----------
const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

// -----------
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product })
    }
}


// ---------
const styles = StyleSheet.create({
    // container: {
    //     backgroundColor: 'white'
    // },
    title: {
        fontSize: 14,
        width: "72%",
        flexWrap: 'wrap',

    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);