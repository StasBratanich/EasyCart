import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartReducer";

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };
  return (
    <Pressable style={styles.itemCardDesign}>
      <Image source={{ uri: item?.image }} style={styles.imageView}></Image>
      <Text style={styles.itemTitleText} numberOfLines={1}>
        {item.title}
      </Text>
      <View style={styles.cardSplitPricerating}>
        <Text style={styles.priceTextDesign}>${item?.price}</Text>
        <Text style={styles.ratingsTextDesign}>{item?.rating?.rate}</Text>
      </View>
      <Pressable onPress={() => addItemToCart(item)}>
        {addedToCart ? (
          <View>
            <Text style={styles.addToCartBtn}>Added To cart</Text>
          </View>
        ) : (
          <Text style={styles.addToCartBtn}>Add To cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  imageView: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },

  itemCardDesign: {
    margin: 25,
  },

  itemTitleText: {
    width: 150,
    marginTop: 10,
    textAlign: "center",
  },

  cardSplitPricerating: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  priceTextDesign: {
    fontSize: 15,
    fontWeight: "bold",
  },

  ratingsTextDesign: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#6d7abf",
  },

  addToCartBtn: {
    backgroundColor: "#070e39",
    color: "white",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    textAlign: "center",
    marginHorizontal: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
});
