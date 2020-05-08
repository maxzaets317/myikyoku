import React from 'react'
import { Image, Linking, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Button, Icon, View, Text, Title, Left, Right, Body, List, ListItem } from 'native-base'

import NavigationService from '@Service/Navigation'

import PublicFooter from '@Screen/Public/Component/Footer'

import Style from '@Theme/Style'
import Styles from '@Screen/Public/Menu/Style'

export default class extends React.Component {
    render() {
        const { goBack } = this.props.navigation;
        return <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <Left style={{ flex: 0.3 }}>
                    <Button transparent onPress={() => {
                        goBack();
                    }}>
                        <Image source={require('@Asset/images/back.png')} style={Style.backIcon} />
                    </Button>
                </Left>
                <Body style={Style.positionCenter}>
                    <Text style={Style.headerTitle}>サービス紹介</Text>
                </Body>
                <Right style={{ flex: 0.3 }}>
                    <Button transparent>
                    </Button>
                </Right>
            </Header>

            <Content>
                <View>
                    <List style={Styles.list}>
                        <ListItem>
                            <Body style={Styles.body}>
                                <Text style={Styles.mainTitle}>「my医局」アプリとは</Text>
                                <Text style={Styles.textContent}>
                                    メディカル・プリンシプル社（以後、当社）が提供する「民間医局」「レジナビ」の会員専用アプリです。
                                    業界ニュースやドクターの転職、アルバイト、定期非常勤情報、初期・専門研修プログラム情報など医学生からドクターのキャリアプランに役立つ情報を提供しています。
                                </Text>
                                <Text style={Styles.mainTitle}>「my医局」に込めた想い</Text>
                                <Text style={Styles.textContent}>
                                    「my医局」は「my=自分自身のためになる」「医局＝情報収集の場」という意味を込めて名付けられました。
                                    枠組みに囚われず、自由に情報収集や知識の更新、スキルアップに繋がる場を「my医局」で提供し、
                                    レジナビでの出会いや民間医局のサポートで、皆様の「生涯価値の向上」を果たしたい。
                                    それが私達メディカル・プリンシプル社の願いです。
                                </Text>
                                <Text style={Styles.mainTitle}>機能紹介</Text>
                                <Text style={[Styles.title, {marginTop: 0}]}>
                                    1.最新ニュース紹介
                                </Text>
                                <Text style={Styles.textContent}>
                                    業界ニュースやセミナー情報などキャリア形成に役立つニュースを配信しています。
                                </Text>
                                <Text style={Styles.title}>
                                    2.記事クリップ機能
                                </Text>
                                <Text style={Styles.textContent}>
                                    忙しくて記事を読む時間ないというドクターの方は『クリップ機能』で後でまとめて読むこともできます。
                                </Text>
                                <Text style={Styles.title}>
                                    3.自分だけのニュース記事集約機能
                                </Text>
                                <Text style={Styles.textContent}>
                                    アプリ以外にも日々購読しているWebニュースのURLを登録すると、アプリ上で最新記事が読めるようになります。医療系以外のニュースも「my医局」アプリでまとめてチェックできるようになる機能です。
                                    ※登録先のWebサイトの仕様により登録できない場合もあります
                                </Text>
                                <Text style={Styles.title}>
                                    4.民間医局
                                </Text>
                                <Text style={Styles.textContent}>
                                    ドクターのキャリア支援を応援するサービスです。
                                    転職、アルバイトや定期非常勤の就業情報から医師賠償保険や女性医師復職支援など多岐に渡り全国のドクターを支援しています。全国に点在する拠点で地域の病院事情を把握していますので、ご希望に合った入職先やアルバイト情報をご提供できます。
                                </Text>
                                <View style={[Style.multiComLine, Style.positionCenter, { marginBottom: 10, }]}>
                                    <View>
                                        <Text style={Style.linkText} onPress={() => Linking.openURL('https://www.doctor-agent.com/about')}>
                                            ＞＞民間医局でできること
                                        </Text>
                                        <View style={Style.dividerText}></View>
                                    </View>
                                    <TouchableOpacity onPress={() => Linking.openURL('https://www.residentnavi.com/about')} >
                                        <Image style={{ width: 24, height: 24, marginLeft: 5 }} source={require('@Asset/images/popup_black_symbol.png')} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={Styles.title}>
                                    5.レジナビ
                                </Text>
                                <Text style={Styles.textContent}>
                                    医学生と初期研修医向けに全国研修先プログラム情報や日本最大規模の説明会「レジナビフェア」情報を提供しています。マッチングや新専門医制度の概要など医学生、初期研修医に役立つ情報も満載です。
                                </Text>
                                <View style={[Style.multiComLine, Style.positionCenter, { marginBottom: 10, }]}>
                                    <View>
                                        <Text style={Style.linkText} onPress={() => Linking.openURL('https://www.residentnavi.com/about_rn')}>
                                            ＞＞レジナビでできること
                                        </Text>
                                        <View style={Style.dividerText}></View>
                                    </View>
                                    <TouchableOpacity onPress={() => Linking.openURL('https://www.residentnavi.com/about_rn')}>
                                        <Image style={{ width: 24, height: 24, marginLeft: 5 }} source={require('@Asset/images/popup_black_symbol.png')} />
                                    </TouchableOpacity>
                                </View>
                            </Body>
                        </ListItem>
                    </List>
                </View>
            </Content>
        </Container>
    }
}

