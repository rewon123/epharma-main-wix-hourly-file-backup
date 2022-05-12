import React, { useEffect, useState } from 'react';
import { Navigation } from 'react-native-navigation';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';

const Product_details = (props) => {
    const [products, setEntries] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const addToCart = (details) => {
        // console.log({details, quantity})
        details.quantity = quantity;
        props.addItemToCart(details);
        setAdded(true);
    }

    const goToCart = (details) => {
        console.log('working');
        Navigation.push(props.componentId, {
            component: {
                name: 'cart',
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

    let total = 0;
    for (let i = 0; i < props.cartItems.length; i++) {
        const product = props.cartItems[i];
        total = total + product.sale_price * product.quantity || 1;
    }



    useEffect(() => {
        let data = {
            "phone": '01710369877',
            "email": 'adn_ice@yahoo.com',
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        return fetch("http://api.epharma.com.bd:82/api/home", requestOptions)
            .then(response => response.json())
            .then((result) => {
                setEntries(result.featured_products)
            });
    }, []);

    const [showmore, setShowmore] = useState(false);
    const [added, setAdded] = useState(false);


    const Card = ({ plant }) => {
        return (
            <TouchableOpacity style={{ width: '32%' }} activeOpacity={0.8}>
                <View style={style.card}>
                    <View
                        style={{
                            alignItems: 'center',
                        }}>
                        <Image
                            source={{ uri: `${plant.images}` }}
                            style={{ width: 75, height: 85, }}
                        />
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 10, marginTop: 12, color: 'black' }}>
                            {plant.title.substring(0, 20)}...
                        </Text>
                        {/* delivery icon condition */}
                        {
                            parseFloat(plant.sale_price) <= 10000.00 ?
                                <View
                                    style={{
                                        // flexDirection: 'row',
                                        justifyContent: 'space-evenly',
                                        marginTop: 5,
                                    }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ fontSize: 10, color: 'gray', fontWeight: 'bold', textDecorationLine: 'line-through', textDecorationStyle: 'solid', }}>
                                            {parseFloat(plant.regular_price).toFixed(2)}
                                        </Text>
                                        {parseFloat(plant.regular_price) != parseFloat(plant.sale_price) ?
                                            <View style={{ backgroundColor: '#CF0000', marginHorizontal: 5 }}>
                                                <Text style={{ color: 'white', fontSize: 8, padding: 3 }}>{Math.round((parseFloat(plant.regular_price).toFixed(2) - parseFloat(plant.sale_price).toFixed(2)) * 100 / parseFloat(plant.regular_price).toFixed(2))}  $ Off</Text>
                                            </View>
                                            : <Text></Text>
                                        }
                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        justifyContent: 'space-between', marginTop: 5
                                    }}>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#1281C5' }}>
                                            ৳ {parseFloat(plant.sale_price).toFixed(2)}
                                        </Text>

                                        {
                                            parseFloat(plant.sale_price).toFixed(2) > 999 ? <Image source={require('../../assets/freeDeilvery.png')} /> : <Text></Text>
                                        }
                                    </View>

                                </View>
                                :
                                <View
                                    style={{
                                        // flexDirection: 'row',
                                        justifyContent: 'space-evenly',
                                        marginTop: 5,
                                    }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ fontSize: 10, color: 'gray', fontWeight: 'bold', textDecorationLine: 'line-through', textDecorationStyle: 'solid', }}>
                                            {parseFloat(plant.regular_price).toFixed(2)}
                                        </Text>
                                        {parseFloat(plant.regular_price) != parseFloat(plant.sale_price) ?
                                            <View style={{ backgroundColor: '#CF0000', marginHorizontal: 5 }}>
                                                <Text style={{ color: 'white', fontSize: 8, padding: 3 }}>{Math.round((parseFloat(plant.regular_price).toFixed(2) - parseFloat(plant.sale_price).toFixed(2)) * 100 / parseFloat(plant.regular_price).toFixed(2))}  $ Off</Text>
                                            </View>
                                            : <Text></Text>
                                        }
                                    </View>
                                    <View style={{
                                        // flexDirection: "row",
                                        flexWrap: "wrap",
                                        justifyContent: 'space-between', marginTop: 5
                                    }}>
                                        <View style={{}}>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#1281C5' }}>
                                                ৳ {parseFloat(plant.sale_price).toFixed(2)}
                                            </Text>
                                        </View>
                                    </View>
                                    {
                                        parseFloat(plant.sale_price).toFixed(2) > 999 ?
                                            <View style={{
                                                flexDirection: "row",
                                                flexWrap: "wrap",
                                                alignSelf: 'flex-end',
                                            }}>
                                                <Image source={require('../../assets/freeDeilvery.png')} />
                                            </View>
                                            : <Text></Text>
                                    }
                                </View>
                        }
                        {/* condition ends here */}

                    </View>

                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View >
            <View>
                <ScrollView>
                    <SafeAreaView>
                        <View style={{ backgroundColor: '#F9F9F9', marginBottom: 50 }} >
                            <View style={{ margin: 10, }}>
                                <Image style={{ width: '100%' }} source={require('../../assets/product_details_banner.png')}></Image>
                            </View>
                            <View style={{ backgroundColor: '#F9F9F9' }}>
                                <View style={{ margin: 10, padding: 10, backgroundColor: 'white', borderRadius: 10 }}>
                                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>{props.details.title.replace(/<[^>]+>/g, '')}</Text>
                                    <Text style={{ fontSize: 16, color: 'black' }}>{props.details.cat_type}: {props.details.cat_name}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Image
                                            style={{ width: '70%', height: 270, }}
                                            source={{ uri: `${props.details.images}` }}
                                        />
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'center' }}>
                                        {
                                            quantity <= 1 ? <TouchableOpacity style={{
                                                backgroundColor: '#0083c1', height: 25, width: 60, borderBottomLeftRadius: 15,
                                                borderTopLeftRadius: 15, justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>-</Text>
                                            </TouchableOpacity> : <TouchableOpacity style={{
                                                backgroundColor: '#0083c1', height: 25, width: 60, borderBottomLeftRadius: 15,
                                                borderTopLeftRadius: 15, justifyContent: 'center', alignItems: 'center'
                                            }}
                                                onPress={() => setQuantity(quantity - 1)}
                                            >
                                                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>-</Text>
                                            </TouchableOpacity>
                                        }

                                        <TouchableOpacity style={{ backgroundColor: 'lightgrey', height: 25, width: 60, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>{quantity}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                            backgroundColor: '#0083c1', height: 25, width: 60, justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 15,
                                            borderTopRightRadius: 15,
                                        }}
                                            onPress={() => setQuantity(quantity + 1)}
                                        >
                                            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>+</Text>
                                        </TouchableOpacity>
                                        {/* <View style={{ marginHorizontal: 25 }}>
                                            <TouchableOpacity style={{
                                                backgroundColor: '#0083c1', height: 35, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 15,
                                            }}
                                                onPress={() => addToCart(props.details)}
                                            >
                                                <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>Add to cart</Text>
                                            </TouchableOpacity>
                                        </View> */}
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 15, padding: 7, color: 'black', fontWeight: 'bold', textDecorationStyle: 'solid', }}>
                                            ৳ {parseFloat(props.details.sale_price).toFixed(2)}
                                        </Text>
                                        <Text style={{ fontSize: 15, padding: 7, color: 'gray', fontWeight: 'bold', textDecorationLine: 'line-through', textDecorationStyle: 'solid', }}>
                                            {parseFloat(props.details.regular_price).toFixed(2)}
                                        </Text>
                                        {parseFloat(props.details.regular_price) != parseFloat(props.details.sale_price) ?
                                            <View style={{ backgroundColor: '#CF0000', marginHorizontal: 5 }}>
                                                <Text style={{ color: 'white', fontSize: 15, padding: 7 }}>{Math.round((parseFloat(props.details.regular_price).toFixed(2) - parseFloat(props.details.sale_price).toFixed(2)) * 100 / parseFloat(props.details.regular_price).toFixed(2))}  % Off</Text>
                                            </View>
                                            : <Text></Text>
                                        }
                                    </View>

                                    {/* <Text style={{ marginTop: 10, fontSize: 16, color: 'grey', fontWeight: 'bold' }}>Highlights</Text> */}
                                    <View style={{ padding: 10, backgroundColor: 'rgba(120, 204, 255, 0.22)', marginVertical: 10 }}>
                                        <Text style={{ fontSize: 16, color: 'black' }}>{props.details.description.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;|&quot;|&apos;|/g, '').replace(/&amp;/g, 'and')}</Text>
                                    </View>
                                    <View style={{ marginTop: 15, }}>
                                        <Image style={{ width: '100%', }} source={require('../../assets/app_mid_banner.png')}></Image>
                                    </View>
                                </View>
                                <View style={{ margin: 10, backgroundColor: '#EFF1F2', borderRadius: 10 }}>
                                    <Text style={{ fontSize: 12, fontColor: 'gray' }}> <Text style={{ fontSize: 12, fontColor: 'gray' }}>Disclaimer: </Text>
                                        {showmore == true ? <Text style={{ color: 'gray' }}> While we work to ensure that product information is correct, on occasion manufacturers may alter their ingredient lists. Actual product packaging and materials may contain more and/or different information than that shown on our Web site. We recommend that you do not solely rely on the information presented and that you always read labels, warnings, and directions before using or consuming a product. For additional information about a product, please contact the manufacturer. Content on this site is for reference purposes and is not intended to substitute for advice given by a physician, pharmacist, or other licensed health-care professional. You should not use this information as self-diagnosis or for treating a health problem or disease. Contact your health-care provider immediately if you suspect that you have a medical problem. Information and statements regarding dietary supplementss may not been evaluated by the DGDA and are not intended to diagnose, treat, cure, or prevent any disease or health condition. ePharma.com.bd assumes no liability for inaccuracies or misstatements about products.
                                            <TouchableOpacity style={{
                                                borderRadius: 20,
                                            }}
                                                onPress={() => setShowmore(false)}
                                            >
                                                <Text style={{ color: '#1281C5D9', fontSize: 12, }}> Show less ...</Text>
                                            </TouchableOpacity>
                                        </Text>
                                            : <Text style={{ color: 'gray' }}> While we work to ensure that product information is correct, on occasion manufacturers may alter their ingredient lists.
                                                <TouchableOpacity
                                                    onPress={() => setShowmore(true)}>
                                                    <Text style={{ color: '#1281C5D9', fontSize: 12, }}> Show more ...</Text>
                                                </TouchableOpacity>

                                            </Text>} </Text>
                                </View>
                                <View style={{ marginHorizontal: 8 }}>
                                    <Text style={{ marginTop: 10, fontSize: 16, color: 'grey', fontWeight: 'bold' }}>Related products</Text>

                                    <SafeAreaView>
                                        <FlatList
                                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                                            showsVerticalScrollIndicator={false}
                                            contentContainerStyle={{
                                                marginTop: 10,
                                                paddingBottom: 20,
                                            }}
                                            numColumns={3}
                                            data={products}
                                            renderItem={({ item }) => {
                                                return <Card plant={item} />;
                                            }}
                                        />
                                    </SafeAreaView>
                                </View>


                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </View>
            <View>
                {
                    added == false ? <View style={style.containerMain} >
                        <View style={style.bottomView} >
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }} onPress={() => addToCart(props.details)}>Add to Bag</Text>
                        </View>
                    </View>

                        :
                        // <TouchableOpacity onPress={() => goToCart()}>
                        //     <View style={style.containerMain} >
                        //         <View style={style.bottomView} >
                        //             <Text style={style.textStyle}>ট {total} |  {props.cartItems.length} Item{props.cartItems.length > 1 ? <Text>s</Text> : <Text></Text>}</Text>
                        //             <Text style={style.textStyle}  >View Bag</Text>
                        //         </View>
                        //     </View>
                        // </TouchableOpacity>
                        <View style={style.containerMain}>
                            <View style={style.bottomView}>
                                <Text style={style.textStyle} onPress={() => goToCart()} >ট {total} |  {props.cartItems.length} Item{props.cartItems.length > 1 ? <Text>s</Text> : <Text></Text>}</Text>
                                <Text style={{ fontWeight: 'bold', color: 'white' }} onPress={() => goToCart()}>View Bag</Text>
                            </View>
                        </View>

                }

            </View>
            {/* <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end',marginHorizontal:10}}>
                <TouchableOpacity style={{borderRadius:50,backgroundColor:'#0083c1',width:50,height:50,alignItems:'center',justifyContent:'center',marginBottom:10}}>
                    <Image style={{width:35,height:35,}}tintColor="white" source={require('../../assets/Shopping-Cart-icon.png')}/>
                </TouchableOpacity>
            </View> */}
        </View >
    );
};
const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
    }
}
//  -----------
const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

const style = StyleSheet.create({
    card: {
        justifyContent: 'space-between',
        width: '100%',
        height: 200,
        backgroundColor: 'white',
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
    },
    containerMain: {
        alignItems: 'center', justifyContent: 'center',
    },
    bottomView: {
        width: '95%',
        height: 35,
        opacity: 0.8,
        margin: 10,
        marginHorizontal: 10,
        backgroundColor: '#1281C5',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 10,
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
    textStyle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
});



export default connect(mapStateToProps, mapDispatchToProps)(Product_details);