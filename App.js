import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Icon, Item, Input,
  Content, Button, Text, Thumbnail, Card, CardItem} from 'native-base'
import {View, Image} from 'react-native'
import axios from 'axios'

export default class App extends Component{
  state = {
      search: '',
      restoran: []
    }

    getapi = () =>{
      var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.search}`;

      var config = {
        headers:{'user-key':'7d26baafd517a0aa1db63c7953421f2c'}
      };

      axios.get(url, config)
      .then((x)=>{
        this.setState({
            restoran: x.data.restaurants
        })
      })
    }
    
  render() {
    var dataResto = this.state.restoran.map((val,i)=>{
      var nama = val.restaurant.name
      var kota = val.restaurant.location.city
      var alamat = val.restaurant.location.address
      var harga = val.restaurant.average_cost_for_two
      var gambar = val.restaurant.thumb
      var gambar2 = 'https://publicdomainvectors.org/photos/molumen_couvert.png'

      return(
        <Card key={i}>
          <CardItem>
            <Left>
              <Thumbnail source={gambar ? {uri: gambar} : {uri: gambar2}} />
              <Body>
                <Text>{nama}</Text>
                <Text note>{kota}</Text>
              </Body>
            </Left>
            <Right>
              <Text>Rp {harga/2}</Text>
            </Right>
          </CardItem>
          <CardItem cardBody>
            <Image source={gambar ? {uri: gambar} : {uri: gambar2}} style={{height: 200, width: null, flex: 1}}/>
          </CardItem>
          <CardItem>
            <Left>
              <Button IconLeft transparent>
                <Icon active name="pin" />
                <Text>{alamat}</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      )
    })
    return (
      <Container style={{backgroundColor: 'pink'}}>

        <Header searchBar rounded style={{backgroundColor:'grey'}}>
          <Item>
            <Icon name='search'/>
            <Input placeholder='Cari menu makanan...'
            onChangeText={(e)=>{this.setState({search: e})}}/>
          </Item>
        </Header>

          <Button iconLeft full danger
          onPress={this.getapi}>
            <Text>Lihat Daftar Resto</Text>
          </Button>
        
        <Content>
          <View style={{margin: 20}}>
            {dataResto}
          </View>
        </Content>
      </Container>
    );
  }
}