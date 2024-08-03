import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState, useContext } from "react";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import ProductItem from "../Components/ProductItem";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Modal, {
  BottomModal,
  SlideAnimation,
  ModalContent,
} from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import { jwtDecode } from "jwt-decode";

const homeIcon = require("../assets/CategoryIcons/icon_home.png");
const dealsIcon = require("../assets/CategoryIcons/icon_deals.png");
const electronicsIcon = require("../assets/CategoryIcons/icon_electronics.png");
const mobilesIcon = require("../assets/CategoryIcons/icon_mobile.png");
const musicIcon = require("../assets/CategoryIcons/icon_music.png");
const fashionIcon = require("../assets/CategoryIcons/icon_fashion.png");

const HomeScreen = () => {
  const images = [
    "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
  ];
  const list = [
    {
      id: "0",
      image: homeIcon,
      name: "Home",
    },
    {
      id: "1",
      image: dealsIcon,
      name: "Deals",
    },
    {
      id: "2",
      image: electronicsIcon,
      name: "Electronics",
    },
    {
      id: "3",
      image: mobilesIcon,
      name: "Mobiles",
    },
    {
      id: "4",
      image: musicIcon,
      name: "Music",
    },
    {
      id: "5",
      image: fashionIcon,
      name: "Fashion",
    },
  ];
  const deals = [
    {
      id: "20",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "30",
      title:
        "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
      oldPrice: 74000,
      price: 26000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      ],
      color: "Cloud Navy",
      size: "8 GB RAM 128GB Storage",
    },
    {
      id: "40",
      title:
        "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
      oldPrice: 16000,
      price: 14000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
      ],
      color: "Icy Silver",
      size: "6 GB RAM 64GB Storage",
    },
    {
      id: "40",
      title:
        "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
      oldPrice: 12999,
      price: 10999,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
      ],
    },
  ];
  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72%",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
      ],
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
      carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];

  const { width } = Dimensions.get("window");
  const height = (width * 50) / 100;

  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const [selectedAddress, setSelectedAdrress] = useState("");
  const [category, setCategory] = useState("all");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [items, setItems] = useState([
    { label: "All categories", value: "all" },
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("error message", error);
      }
    };

    fetchProducts();
  }, []);

  const ImageCarousel = ({ images }) => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((item, index) => (
          <ImageBackground
            style={{
              width,
              height,
              marginBottom: 10,
              marginTop: 10,
              resizeMode: "contain",
            }}
            source={{ uri: item }}
            key={index}
          >
            <View></View>
          </ImageBackground>
        ))}
      </ScrollView>
    );
  };

  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://MYIP:5000/addresses/${userId}`);
      const { addresses } = response.data;
      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const filterProducts = () => {
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView>
          <View style={styles.searchView}>
            <Pressable style={styles.searchBarPressable}>
              <Feather
                name="search"
                size={22}
                color="#070e39"
                style={{ paddingStart: 10 }}
              />
              <TextInput
                placeholder="Search in EasyCart"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </Pressable>
            <Feather
              name="mic"
              size={24}
              color="white"
              style={{ paddingEnd: 5, paddingStart: 5 }}
            />
          </View>

          <Pressable
            style={styles.addressView}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Entypo name="location-pin" size={24} color="white" />
            <Pressable>
              {selectedAddress ? (
                <Text style={styles.addressText}>
                  Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={styles.addressText}>Add an address</Text>
              )}
            </Pressable>
            <Entypo
              name="chevron-thin-down"
              size={16}
              color="white"
              style={{ paddingStart: 5 }}
            />
          </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable style={styles.categoryItem} key={index}>
                <Image
                  style={styles.horizontalCircleCropImage}
                  source={item.image}
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={{ flex: 1 }}>
            <ImageCarousel images={images} />
          </View>

          <Text style={styles.borderDesign}></Text>

          <View style={styles.dropdownContainer}>
            <Pressable
              style={styles.dropdownButton}
              onPress={() => setIsDropdownVisible(true)}
            >
              <Text>{category || "Choose category"}</Text>
              <Entypo name="chevron-down" size={24} color="#070e39" />
            </Pressable>
          </View>

          <Modal
            transparent={true}
            visible={isDropdownVisible}
            onRequestClose={() => setIsDropdownVisible(false)}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPressOut={() => setIsDropdownVisible(false)}
            >
              <View style={styles.dropdownList}>
                {items.map((item) => (
                  <Pressable
                    key={item.value}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setCategory(item.value);
                      setIsDropdownVisible(false);
                    }}
                  >
                    <Text>{item.label}</Text>
                  </Pressable>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

          <View style={styles.itemsView2Columns}>
            {filterProducts()
              .filter(
                (item) => category === "all" || item.category === category
              )
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>

          <Text style={styles.borderDesign}></Text>

          <Text style={styles.headlineText}>Trending Deals Of The Week</Text>
          <View style={styles.itemsView2Columns}>
            {deals.map((item, index) => (
              <Pressable
                key={index}
                style={styles.itemCardPressableDesign}
                onPress={() => {
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    carouselImages: item.carouselImages,
                    color: item.color,
                    size: item.size,
                    oldPrice: item.oldPrice,
                    item: item,
                  });
                }}
              >
                <Image
                  style={styles.itemDealsCardDesign}
                  source={{ uri: item.image }}
                />
              </Pressable>
            ))}
          </View>

          <Text style={styles.borderDesign}></Text>
          <Text style={styles.headlineText}>Today's Deals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                key={index}
                style={styles.itemCardPressableDesign}
                onPress={() => {
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    carouselImages: item.carouselImages,
                    color: item.color,
                    size: item.size,
                    oldPrice: item.oldPrice,
                    item: item,
                  });
                }}
              >
                <Image
                  style={styles.itemOffersCardDesign}
                  source={{ uri: item.image }}
                />
                <View style={styles.discountOfferText}>
                  <Text style={styles.addressText}>{item.offer} Off</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View>
            <Text>Choose your Location</Text>
            <Text>
              Select a delivery location to see product availability and
              delivery options
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {addresses.map((item, index) => (
              <Pressable
                style={[
                  styles.addAdressBtnDesign,
                  {
                    backgroundColor:
                      selectedAddress === item ? "#64c725" : "white",
                  },
                ]}
                key={index}
                onPress={() => setSelectedAdrress(item)}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text numberOfLines={1} style={styles.boldTextDesign}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="#6d7abf" />
                </View>

                <Text numberOfLines={1} style={styles.notBoldTextDesign}>
                  {item?.street} , {item?.houseNumber}
                </Text>
                <Text numberOfLines={1} style={styles.notBoldTextDesign}>
                  {item?.city}
                </Text>
                <Text numberOfLines={1} style={styles.notBoldTextDesign}>
                  Israel
                </Text>
              </Pressable>
            ))}
            <Pressable
              style={styles.addAdressBtnDesign}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
            >
              <Text style={styles.addAdressTextViewDesign}>Add an adress</Text>
            </Pressable>
          </ScrollView>
          <View style={{ flexDirection: "col", gap: 7, marginBottom: 30 }}>
            <View style={styles.zipcodeViewDesign}>
              <Entypo name="location-pin" size={22} color="#6d7abf" />
              <Text style={styles.addAdressTextViewDesign}>Enter Zip code</Text>
            </View>
            <View style={styles.zipcodeViewDesign}>
              <Ionicons name="locate-sharp" size={22} color="#6d7abf" />
              <Text style={styles.addAdressTextViewDesign}>
                Use my corrent location
              </Text>
            </View>
            <View style={styles.zipcodeViewDesign}>
              <Ionicons name="earth" size={22} color="#6d7abf" />
              <Text style={styles.addAdressTextViewDesign}>
                Deliver outside my country
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    flex: 1,
    backgroundColor: "white",
  },
  searchBarPressable: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 10,
    height: 38,
    flex: 1,
  },

  searchView: {
    backgroundColor: "#070e39",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  addressView: {
    backgroundColor: "#6d7abf",
    padding: 10,
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  addressText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },

  horizontalCircleCropImage: { width: 50, height: 50, resizeMode: "contain" },

  categoryText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
  },

  categoryItem: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  headlineText: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  itemsView2Columns: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  itemDealsCardDesign: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },

  itemOffersCardDesign: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },

  itemCardPressableDesign: {
    marginVertical: 10,
    flexDirection: "column",
    alignItems: "center",
  },

  borderDesign: {
    height: 1,
    borderColor: "#6d7abf",
    borderWidth: 3,
    marginTop: 15,
    marginBottom: 15,
  },
  discountOfferText: {
    backgroundColor: "#070e39",
    paddingVertical: 5,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
  },
  addAdressBtnDesign: {
    width: 140,
    height: 140,
    marginTop: 10,
    marginEnd: 15,
    borderColor: "#070e39",
    borderWidth: 3,
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addAdressTextViewDesign: {
    textAlign: "center",
    color: "#6d7abf",
    fontWeight: "500",
  },
  zipcodeViewDesign: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  boldTextDesign: {
    fontSize: 12,
    fontWeight: "bold",
  },

  notBoldTextDesign: {
    fontSize: 12,
  },

  dropdownContainer: {
    marginHorizontal: 10,
    width: "45%",
    marginBottom: 15,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#070e39",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
  },
  dropdownList: {
    backgroundColor: "white",
    padding: 10,
  },
  dropdownItem: {
    color: "black",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
