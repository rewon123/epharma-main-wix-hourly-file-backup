import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, TextInput, StyleSheet, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import MyCarousel from '../../components/slider/MyCarousel';
import Products from '../../components/products/Products';


class Home extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }


    navigationButtonPressed({ buttonId }) {
        if (buttonId === 'sideBar') {
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    left: {
                        visible: true,
                    }
                }
            });
        }
        if (buttonId === 'cartIcon') {
            Navigation.push(this.props.componentId, {
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
    }

    render() {
        return (
            <View style={{ backgroundColor: '#F9F9F9' }}>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={{ flex: 1, paddingLeft: 10 }}
                        placeholder="Search Medicine... ঔষধ সার্চ করুন"
                        underlineColorAndroid="transparent"
                    />
                    <Image
                        source={require('../../assets/search.png')} //Change your icon image here
                        style={styles.ImageStyle}
                    />
                </View>
                <ScrollView style={{ height: '90%' }} showsVerticalScrollIndicator={false}>
                    <MyCarousel />
                    <View style={{ marginTop: -45 }}>
                        <Image style={{ height: 150, marginHorizontal: 10, borderRadius: 10 }} source={{ uri: `https://epharma.com.bd/storage/mobile_banner/epharma-banners-01.jpg` }} />

                        {/* upload Prescription/call for order/drop your message  */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 10 }}>
                            <View style={{
                                borderWidth: 1,
                                borderColor: "#1281C5",
                                width: '31.33%',
                                // height: '100%',
                                padding: 5,
                                marginHorizontal: 20,
                                marginVertical: 10,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white'

                            }}>
                                <Text style={{
                                    color: '#1281C5',
                                    fontSize: 10, fontWeight: "bold", textAlign: "center",
                                }}>প্রেসক্রিপশন আপলোড {'\n'}
                                    Upload Prescription </Text>
                                <Image
                                    // style={{ width: '100%' }}
                                    source={require('../../assets/Group_1.png')}
                                />
                                <Text style={{
                                    color: '#FF0000',
                                    fontSize: 10
                                }}>Upto 10% Off + {'\n'}
                                    Free Delivery</Text>
                            </View>
                            <View style={{
                                borderWidth: 1,
                                borderColor: "#1281C5",
                                padding: 5,
                                marginHorizontal: 20,
                                marginVertical: 10,
                                borderRadius: 10, alignItems: 'center',
                                justifyContent: 'center',

                                width: '31.33%',
                                backgroundColor: 'white'


                                // height: '100%',
                            }}>
                                <Text style={{
                                    color: '#1281C5',
                                    fontSize: 10,
                                    fontWeight: "bold", textAlign: "center",
                                }}>অর্ডার করতে  কল করুন {'\n'}
                                    Call for Order  </Text>
                                <Image
                                    // style={{ width: '100%',}}
                                    source={require('../../assets/image_15.png')}
                                />
                                <Text style={{
                                    color: '#FF0000',
                                    fontSize: 10
                                }}>10AM to 7PM</Text>
                            </View>
                            <View style={{
                                borderWidth: 1,
                                borderColor: "#1281C5",
                                padding: 5,
                                marginHorizontal: 20,
                                marginVertical: 10,
                                // height: '100%',
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '31.33%',
                                backgroundColor: 'white'

                            }}>
                                <Text style={{
                                    color: '#1281C5',
                                    fontSize: 10, fontWeight: "bold", textAlign: "center",
                                }}>ম্যাসেজ করুন {'\n'}
                                    Drop your Message </Text>
                                <Image
                                    // style={{width: '100%'}}
                                    source={require('../../assets/image_16.png')}
                                />
                                <Text style={{
                                    color: '#FF0000',
                                    fontSize: 10
                                }}>24 hours {'\n'}
                                    Every day</Text>
                            </View>
                        </View>
                        {/* categories */}
                        <View style={{ marginHorizontal: 10, backgroundColor: 'white', borderRadius: 10, height: 90 }}>
                            <ScrollView horizontal={true} showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity style={{ height: 50, padding: 10,  alignItems: 'center' }}>
                                    <Image
                                        style={{ height: 50, }}
                                        source={require('../../assets/personal_care.png')}
                                    />
                                    <Text>personal..</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 50, padding: 10, alignItems: 'center' }}>
                                    <Image
                                        style={{ height: 50, }}

                                        source={require('../../assets/devices.png')}
                                    />
                                    <Text>Devices</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 50, padding: 10,  alignItems: 'center' }}>
                                    <Image
                                        style={{ width: 50, height: 50 }}
                                        source={require('../../assets/mothercare.jpeg')}
                                    />
                                    <Text>Women...</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 50, padding: 10,  alignItems: 'center' }}>
                                    <Image
                                        style={{ height: 50, }}

                                        source={require('../../assets/sexual_wellness.png')}
                                    />
                                    <Text>Sexual...</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 50, padding: 10,  alignItems: 'center' }}>
                                    <Image
                                        style={{ height: 50, }}

                                        source={require('../../assets/Vitamins.png')}
                                    />
                                    <Text>Vitamins</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 50, padding: 10,  alignItems: 'center' }}>
                                    <Image
                                        style={{ height: 50, }}

                                        source={require('../../assets/baby.png')}
                                    />
                                    <Text>Baby...</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 50, padding: 10, alignItems: 'center' }}>
                                    <Image
                                        style={{ height: 50, }}

                                        source={require('../../assets/skin_care.png')}
                                    />
                                    <Text>Skin...</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 50, padding: 10, alignItems: 'center' }}>
                                    <Image
                                        style={{ height: 50, }}

                                        source={require('../../assets/Diabetic_Care.png')}
                                    />
                                    <Text>Diabetic...</Text>

                                </TouchableOpacity>
                            </ScrollView>
                        </View>

                        {/* ask a doctor / lab test /home nursing  */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 10 }}>
                            <View style={{
                                borderWidth: 1,
                                borderColor: "#1281C5",
                                width: '31.33%',
                                // height: '100%',
                                padding: 5,
                                marginHorizontal: 20,
                                marginVertical: 10,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white'

                            }}>
                                <Image
                                    // style={{ width: '100%' }}
                                    source={require('../../assets/doctors-call-button2.png')}
                                />
                            </View>
                            <View style={{
                                borderWidth: 1,
                                borderColor: "#1281C5",
                                padding: 5,
                                marginHorizontal: 20,
                                marginVertical: 10,
                                borderRadius: 10, alignItems: 'center',
                                justifyContent: 'center',

                                width: '31.33%',
                                backgroundColor: 'white'


                                // height: '100%',
                            }}>
                                <Image
                                    // style={{ width: '100%',}}
                                    source={require('../../assets/Lab-test-button1.png')}
                                />

                            </View>
                            <View style={{
                                borderWidth: 1,
                                borderColor: "#1281C5",
                                padding: 5,
                                marginHorizontal: 20,
                                marginVertical: 10,
                                // height: '100%',
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '31.33%',
                                backgroundColor: 'white'

                            }}>
                                <Image
                                    // style={{width: '100%'}}
                                    source={require('../../assets/home-nursing-button1.png')}
                                />
                            </View>
                        </View>

                    </View>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', padding: 10, marginHorizontal: 10, borderRadius: 15, marginTop: 15, }}>
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 16 }}>Quick Order</Text>
                            <Text style={{ color: 'gray', fontSize: 16 }}>{`Upload doctor's prescripton
and we will add the medicines 
for you!`} </Text>
                            <TouchableOpacity style={{ width: 90, marginTop: 10, borderRadius: 8, paddingVertical: 10, color: '#fff', textAlign: 'center', backgroundColor: '#68a0cf', borderRadius: 10, alignItems: "center" }}>
                                <Text style={{ color: '#fff', fontSize: 16 }}>Upload</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                            <Image source={require('../../assets/drawable/pres_upload.png')} style={{ height: 115, width: 100, marginLeft: 6 }} />
                        </View>
                    </View> */}
                    <Products props={this.props} />
                </ScrollView>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 10,
        marginTop: 5
    },
    ImageStyle: {
        padding: 8,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    }
})
export default Home;