import React, { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Product_details from '../../views/product_details/Product_details';

const Products = (props) => {
    const [productDetaill, setProductDetaill] = useState([])
    const [products, setEntries] = useState([]);
    console.log(productDetaill);

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
    }, [6969]);

    const pushF = (details) => {
        Navigation.push(props.props.componentId, {
            component: {
                name: 'productsDetails',
                passProps: { details, setProductDetaill },
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

    const Card = ({ plant }) => {
        return (
            <TouchableOpacity style={{ width: '32%' }} activeOpacity={0.8} onPress={() => pushF(plant, 'sad')} >
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
        <View style={{ marginHorizontal: 8 }}>
            <SafeAreaView>
                <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 16 }}>Feature Products</Text>
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
    );
};

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
});

export default Products;