import React from 'react'
import { Image } from 'react-native'
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
                    <Text style={Style.headerTitle}>プライバシーポリシー</Text>
                </Body>
                <Right style={{flex: 0.3}}>
                    <Button transparent>
                    </Button>
                </Right>
            </Header>

            <Content>
                <View>
                    <List style={Styles.list}>
                        <ListItem>
                            <Body style={Styles.body}>
                                <Text style={[Styles.textContent, {marginTop: 12}]}>
                                    株式会社メディカル・プリンシプル社（以下「当社」）は、医療関連及び医療関係者に係わるサービス業務を実施しており、個人情報の保護を最重要課題と位置づけ、経営の取組みとして、個人情報保護マネジメントシステムを確立し、実施し、維持し、全社員が、以下に定める方針を遵守し、個人情報の適切な取扱いと厳正な保護に努めてまいります。
                                </Text>
                                <Text style={Styles.mainTitle}>1.個人情報のお取扱いについて</Text>
                                <Text style={Styles.textContent}>個人情報の取得{'\n'}
                                    当社は、取得目的を明確にし、適法かつ公正な手段によって、個人情報を取得します。{'\n'}
                                    取得する個人情報の利用目的{'\n'}
                                    1) 当社は、医療関係者及び医学生等から取得した個人情報を、各種セミナー、医療関連情報の提供、ライフサポートサービス、キャリアコンサルティング、SNSサービス業務等の実施に利用します。{'\n'}
                                    2) 当社は、採用応募者から取得した個人情報を採用・人事管理等の実施に、並びに株主様からの個人情報を連絡業務等に利用します。{'\n'}
                                    3) 当社は、取得した個人情報を上記の目的以外には使用いたしません。さらに、利用目的の範囲を超えた利用をしないよう適切な措置を講じます。{'\n'}
                                    個人情報の委託{'\n'}
                                    当社は、個人情報の取扱いを委託する場合は、これら委託先を厳正に調査・選定し、適正な取扱いを確実にするために、適切な監督を行います。{'\n'}
                                    個人情報の第三者提供{'\n'}
                                    当社は、法令に基づく場合を除き、事前に本人の同意を得ることなく、個人情報を第三者に提供いたしません。{'\n'}
                                    開示対象個人情報の開示等の請求{'\n'}
                                    当社は、保有する個人情報のうち、当社が本人からの開示等の求めに応じることができる権限を有するもの（「開示対象個人情報」といいます）について、これらの要求があった場合には、速やかに対応いたします。開示対象個人情報の周知及び開示等の請求方法については、「開示対象個人情報の周知及び開示等の請求について」をご参照ください。{'\n'}
                                    クッキー（Cookie）の利用について{'\n'}
                                    当社のウェブサイトでは、当社および当社が業務委託する広告掲載事業者が、以下の目的のため「クッキー(Cookie)」を利用することがあります （クッキーとは）。{'\n'}
                                    お客様が認証サービスにログインされるとき、保存されているお客様の登録情報を参照して、お客様ごとにカスタマイズされたサービスを提供できるようにするため{'\n'}
                                    お客様が興味を持っている内容や、当社のサイト上での利用状況をもとに、最も適切な広告を他のサイト上で表示するため{'\n'}
                                    当社のサイトのアクセス状況を調査し、サービスを改善するため
                                </Text>
                                <Text style={Styles.mainTitle}>2.法令等の遵守</Text>
                                <Text style={Styles.textContent}>当社は、個人情報の保護に関する法令、国が定める指針（ガイドライン）、その他の規範を遵守します。</Text>
                                <Text style={Styles.mainTitle}>3.個人情報の安全管理措置</Text>
                                <Text style={Styles.textContent}>当社は、個人情報の漏えい、滅失又はき損を防止する為、適切な予防策を実施します。また、何らかの問題が発生した場合には、速やかに是正措置を講じます。</Text>
                                <Text style={Styles.mainTitle}>4.管理体制</Text>
                                <Text style={Styles.textContent}>当社は、個人情報保護管理者のもと、部門毎に責任者を任命して、適切な個人情報の管理を実施します。また、全社員に対して教育を継続的に実施します。</Text>
                                <Text style={Styles.mainTitle}>5.苦情・相談のお問合せ</Text>
                                <Text style={Styles.textContent}>当社への個人情報に関する苦情・相談については、下記の個人情報相談窓口までお問合せください。</Text>
                                <Text style={Styles.mainTitle}>6.個人情報保護マネジメントシステムの継続的改善</Text>
                                <Text style={Styles.textContent}>当社は、この方針を実行するため、監査の報告、社会情勢の変化等に基づいて、個人情報保護マネジメントシステムを継続的に見直し・改善を行います。</Text>
                                <Text style={Styles.textContent}>{'\n'}2004年7月20日制定{'\n'}
                                    2012年12月1日改訂{'\n'}
                                    2013年1月2日施行{'\n'}{'\n'}
                                    株式会社メディカル・プリンシプル社{'\n'}
                                    代表取締役社長　井川　幸広{'\n'}{'\n'}
                                    個人情報相談窓口{'\n'}
                                    株式会社 メディカル・プリンシプル社{'\n'}
                                    TEL　03-4565-6100{'\n'}
                                    e-mail：privacy@medical-principle.co.jp

                                </Text>
                                <Text style={Styles.mainTitle}>7.開示対象個人情報について</Text>
                                <Text style={Styles.textContent}>事業者の氏名{'\n'}
                                    株式会社　メディカル・プリンシプル社{'\n'}
                                    個人情報保護管理者{'\n'}
                                    経営企画部長　TEL　03-4565-6100{'\n'}
                                    利用目的{'\n'}
                                    1) 医療関係者及び医学生等に関する個人情報{'\n'}
                                    各種セミナー、医療関連情報の提供、ライフサポートサービス、キャリアコンサルティング業務等における{'\n'}
                                    医療関係者及び医学生等との連絡、協力、交渉、契約の履行、履行請求等{'\n'}
                                    医療関係者及び医学生等へのフォローアップ{'\n'}
                                    当社製品・サービスのご案内{'\n'}
                                    2) 株主の皆様に関する個人情報{'\n'}
                                    事業報告書等配付物の送付{'\n'}
                                    3) 採用候補者・応募者の皆様に関する個人情報{'\n'}
                                    採用選考{'\n'}
                                    採用候補者・応募者との連絡{'\n'}
                                    4) 従業員等に関する個人情報{'\n'}
                                    従業員等の雇用管理及び連絡{'\n'}
                                    苦情・相談窓口{'\n'}
                                    個人情報相談窓口{'\n'}
                                    株式会社メディカル・プリンシプル社{'\n'}
                                    TEL　03-4565-6100{'\n'}
                                    e-mail：privacy@medical-principle.co.jp
                                </Text>
                                <Text style={Styles.mainTitle}>8.開示対象個人情報の開示等の請求について</Text>
                                <Text style={Styles.textContent}>当社にて保有している開示対象個人情報に関しての開示等の請求については、請求用紙（開示対象個人情報の開示等の依頼票）［PDF］に必要事項を記入、捺印し、請求人が本人である確認に必要な書類を同封の上、郵送でお送りください。{'\n'}
                                    到着後、ご請求の内容について確認の上、適正な処理を遅滞なく（3営業日以内）実施し、原則として書面（封書）にて回答いたします。{'\n'}
                                    請求できる内容{'\n'}
                                    開示対象個人情報の開示{'\n'}
                                    開示対象個人情報の利用目的の通知{'\n'}
                                    開示対象個人情報の訂正（変更・追加）{'\n'}
                                    開示対象個人情報の削除{'\n'}
                                    開示対象個人情報の利用停止又は第三者への提供停止{'\n'}
                                    本人確認に必要な書類{'\n'}
                                    開示等の請求用紙に記載されている開示等を求める方の氏名及び住所と同一のものが記載されている運転免許証、パスポート、健康保険の被保険者証、外国人登録証明書、住民基本台帳カードのコピーのいずれか1通。{'\n'}
                                    本籍地の情報は塗りつぶしてお送りください。{'\n'}
                                    手数料の徴収{'\n'}
                                    開示等の求めに応ずるための手数料は徴収いたしません。{'\n'}
                                    代理人による申請を希望される場合の必要な書類及び手続きについては「個人情報相談窓口」にご連絡ください。{'\n'}
                                    書類の送付先 〒105-0004 {'\n'}
                                    東京都港区新橋4-1-1 新虎通りCORE{'\n'}
                                    株式会社メディカル・プリンシプル社{'\n'}
                                    個人情報相談窓口{'\n'}
                                    e-mail：privacy@medical-principle.co.jp{'\n'}
                                    電話：03-4565-6100
                                </Text>
                            </Body>
                        </ListItem>
                    </List>
                </View>
            </Content>
        </Container>
    }
}

