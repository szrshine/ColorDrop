import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Linking,
  Modal,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

// Gizlilik Politikası Metni
const privacyPolicyText = `GİZLİLİK POLİTİKASI

Son Güncelleme: 11 Kasım 2025

ColorDrop'a hoş geldiniz. Bu Gizlilik Politikası, mobil oyun uygulamamızı kullandığınızda bilgilerinizi nasıl topladığımızı, kullandığımızı, ifşa ettiğimizi ve koruduğumuzu açıklar.

TOPLANAN BİLGİLER

Otomatik Olarak Toplanan Bilgiler:
• Cihaz bilgileri (model, işletim sistemi sürümü)
• Benzersiz cihaz tanımlayıcıları
• Oyun verileri (skorlar, başarımlar, istatistikler)
• Kullanım verileri (oturum süreleri)
• Hata raporları ve çökme günlükleri

Sağladığınız Bilgiler:
• Kullanıcı profili veya takma ad
• Liderlik tablosu katılımı
• Geri bildirimler

BİLGİLERİN KULLANIMI

Topladığımız bilgileri şu amaçlarla kullanırız:
• Oyunu sağlamak, işletmek ve sürdürmek
• Oyun deneyiminizi iyileştirmek ve kişiselleştirmek
• Oyun istatistiklerini ve başarımları izlemek
• Liderlik tablolarını görüntülemek ve yönetmek
• Kullanım kalıplarını analiz etmek
• Teknik sorunları gidermek ve düzeltmek

VERİ DEPOLAMA

Oyun verileriniz cihazınızda yerel olarak AsyncStorage kullanılarak saklanır. Bazı veriler bulut hizmetlerine senkronize edilebilir.

ÜÇÜNCÜ TARAF HİZMETLER

ColorDrop aşağıdaki üçüncü taraf hizmetlerini kullanabilir:
• Google AdMob - Reklamlar
• Firebase Analytics - Uygulama kullanımı analizi
• Sentry - Hata takibi
• Google Play Games / Apple Game Center - Liderlik tabloları

ÇOCUKLARIN GİZLİLİĞİ

ColorDrop tüm yaşlar için uygundur (3+). 13 yaşın altındaki çocuklardan ebeveyn izni olmadan bilerek kişisel bilgi toplamıyoruz.

HAKLARINIZ

Şunları yapma hakkınız vardır:
• Hakkınızda tuttuğumuz kişisel bilgilere erişim
• Yanlış bilgilerin düzeltilmesini talep
• Bilgilerinizin silinmesini talep
• Veri toplamayı reddetme
• İzninizi geri çekme

VERİ GÜVENLİĞİ

Bilgilerinizi yetkisiz erişim, değiştirme, ifşa veya imhadan korumak için makul güvenlik önlemleri uyguluyoruz.

İLETİŞİM

Bu Gizlilik Politikası hakkında sorularınız varsa lütfen bizimle iletişime geçin:

E-posta: support@szrgame.com
Geliştirici: SZR Game Studios
Adres: Istanbul, Turkey

UYUMLULUK

Bu Gizlilik Politikası şunlara uygundur:
• Genel Veri Koruma Yönetmeliği (GDPR)
• California Tüketici Gizlilik Yasası (CCPA)
• Çocukların Çevrimiçi Gizlilik Koruma Yasası (COPPA)
• Apple App Store Yönergeleri
• Google Play Store Politikaları`;

// Kullanım Şartları Metni
const termsOfServiceText = `KULLANIM ŞARTLARI

Son Güncelleme: 11 Kasım 2025

HİZMET AÇIKLAMASI

ColorDrop, düşen renkli damlaları doğru renk platformlarıyla eşleştirdiğiniz hızlı tempolu bir renk eşleştirme bulmaca oyunudur.

UYGUNLUK

ColorDrop'u kullanarak şunları beyan edersiniz:
• En az 13 yaşındasınız veya 13 yaşın altındaysanız ebeveyn/vasi izniniz var
• Bu Şartları kabul etme yasal kapasitesine sahipsiniz
• Oyunu yürürlükteki yasalar kapsamında kullanmanız yasak değildir

KULLANICI HESABI VE VERİLERİ

Oyun ilerlemeniz, skorlarınız ve istatistikleriniz cihazınızda yerel olarak saklanır. Cihazınızın güvenliğini sağlamak sizin sorumluluğunuzdur.

KABULEDİLEBİLİR KULLANIM

ŞU DAVRANIŞLARDA BULUNMAMAYI kabul edersiniz:
• Oyunu değiştirmek, tersine mühendislik yapmak veya kaynak kodunu çıkarmak
• Hile, istismar, otomasyon yazılımı, botlar veya hack kullanmak
• Liderlik tablolarını veya başarımları haksız yere manipüle etmek
• Sahte hesaplar oluşturmak veya başkasının kimliğine bürünmek
• Oyunu yasadışı amaçlarla kullanmak
• Oyunun sunucularına veya ağlarına müdahale etmek

FİKRİ MÜLKİYET HAKLARI

ColorDrop ve tüm içeriği, özellikleri ve işlevselliği SZR Game Studios'a aittir ve uluslararası telif hakkı, ticari marka ve diğer fikri mülkiyet yasalarıyla korunmaktadır.

UYGULAMA İÇİ SATIN ALMALAR

Mevcut olduğunda, ColorDrop şunları sunabilir:
• Premium özellikler
• Kozmetik öğeler (görünümler, temalar)
• Güçlendirmeler
• Sanal para (coinler)
• Reklam kaldırma

Önemli: Tüm satın almalar kesindir ve iade edilemez (yasa gereği haller hariç).

GARANTİ REDDİ

OYUN "OLDUĞU GİBİ" VE "MEVCUT OLDUĞU ŞEKLİYLE" sağlanır. Şunları garanti etmiyoruz:
• Oyunun gereksinimlerinizi karşılayacağı
• Oyunun her zaman kullanılabilir olacağı
• Hataların veya bugların düzeltileceği
• Oyunun virüslerden arınmış olduğu

SORUMLULUK SINIRLAMASI

Yasaların izin verdiği azami ölçüde:
• Dolaylı, arızi, özel veya cezai zararlardan sorumlu değiliz
• Toplam sorumluluğumuz son 12 ayda bize ödediğiniz tutarı aşmayacaktır
• Veri, kâr veya iyi niyet kaybından sorumlu değiliz

HİZMET DEĞİŞİKLİKLERİ

Şunları yapma hakkını saklı tutarız:
• Oyunu istediğimiz zaman değiştirmek veya durdurmak
• Özellikleri, içeriği veya mekaniği güncellemek
• Uygulama içi satın almaları değiştirmek veya kaldırmak
• Fiyatlandırmayı ayarlamak

SONLANDIRMA

Erişiminizi şu durumlarda sonlandırabiliriz:
• Bu Şartların ihlali
• Hileli, kötüye kullanılan veya yasadışı faaliyetler
• Herhangi bir nedenle, kendi takdirimize bağlı olarak

YÖNETİM HUKUKU

Bu Şartlar Türkiye yasalarına tabidir. Anlaşmazlıklar İstanbul mahkemelerinde çözülecektir.

İLETİŞİM

Bu Şartlar hakkında sorular için lütfen bizimle iletişime geçin:

E-posta: support@szrgame.com
Geliştirici: SZR Game Studios
Konum: Istanbul, Turkey

ONAY

COLORDROP'U İNDİREREK, YÜKLEYEREK VEYA KULLANARAK, BU KULLANIM ŞARTLARINI OKUDUĞUNUZU, ANLADIĞINIZI VE BUNLARA BAĞLI OLMAYI KABUL ETTİĞİNİZİ BEYAN EDERSİNİZ.`;

const COLORS = [
  { id: 'red', color: '#FF3B30', name: 'Kırmızı' },
  { id: 'blue', color: '#007AFF', name: 'Mavi' },
  { id: 'green', color: '#34C759', name: 'Yeşil' },
  { id: 'yellow', color: '#FFCC00', name: 'Sarı' },
];

const BALL_SIZE = 40;
const INITIAL_SPEED = 2;
const SPEED_INCREMENT = 0.5;

export default function App() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameOver
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [balls, setBalls] = useState([]);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const gameLoop = useRef(null);
  const ballIdCounter = useRef(0);
  const spawnTimer = useRef(0); // Spawn zamanlayıcı

  // Yüksek skoru yükle
  useEffect(() => {
    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    try {
      const savedHighScore = await AsyncStorage.getItem('highScore');
      if (savedHighScore !== null) {
        setHighScore(parseInt(savedHighScore));
      }
    } catch (error) {
      console.log('Yüksek skor yüklenirken hata:', error);
    }
  };

  const saveHighScore = async (newScore) => {
    try {
      if (newScore > highScore) {
        await AsyncStorage.setItem('highScore', newScore.toString());
        setHighScore(newScore);
      }
    } catch (error) {
      console.log('Yüksek skor kaydedilirken hata:', error);
    }
  };

  // Oyunu başlat
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setBalls([]);
    setSpeed(INITIAL_SPEED);
    ballIdCounter.current = 0;
    spawnTimer.current = 0;
    spawnBall();
  };

  // Yeni top oluştur
  const spawnBall = () => {
    setBalls((prevBalls) => {
      // En üstteki topu kontrol et
      const topMostBall = prevBalls.length > 0
        ? prevBalls.reduce((top, ball) => ball.y < top.y ? ball : top, prevBalls[0])
        : null;

      // Minimum mesafe kontrolü - en üstteki toptan yeterince uzakta mı?
      const minSpawnDistance = BALL_SIZE * 1.5; // Daha az mesafe = daha sık spawn
      if (topMostBall && topMostBall.y < minSpawnDistance) {
        // Çok yakın, spawn etme
        return prevBalls;
      }

      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      const newBall = {
        id: ballIdCounter.current++,
        colorId: randomColor.id,
        color: randomColor.color,
        x: Math.random() * (width - BALL_SIZE),
        y: -BALL_SIZE,
        fadeAnim: new Animated.Value(1),
        targetX: null, // Hedef X konumu
        isDirected: false, // Top yönlendirildi mi?
      };

      return [...prevBalls, newBall];
    });
  };

  // Ana oyun döngüsü
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoop.current = setInterval(() => {
        setBalls((prevBalls) => {
          const updatedBalls = prevBalls.map((ball) => {
            let newX = ball.x;
            let newY = ball.y + speed;

            // Eğer top yönlendirilmişse, hedefe doğru hareket et
            if (ball.isDirected && ball.targetX !== null) {
              const diff = ball.targetX - ball.x;
              const moveSpeed = 80; // Yatay hareket hızı - anında geçiş için çok hızlı

              if (Math.abs(diff) > 1) {
                newX = ball.x + Math.sign(diff) * Math.min(Math.abs(diff), moveSpeed);
              } else {
                newX = ball.targetX;
              }
            }

            // Minimum mesafe kontrolü: bir topun altındaki toptan çok yakın olmasını engelle
            const sortedBalls = prevBalls
              .filter((b) => b.id !== ball.id && b.y > ball.y) // Bu topun altındaki toplar
              .sort((a, b) => a.y - b.y); // En yakın üsttekinden başla

            if (sortedBalls.length > 0) {
              const closestBallBelow = sortedBalls[0];
              const minDistance = BALL_SIZE * 2; // Minimum mesafe (topun 2 katı) - daha katı

              // Eğer çok yakınsa, hareket etme
              if (closestBallBelow.y - newY < minDistance) {
                newY = ball.y; // Hareket etme, bekle
              }
            }

            return {
              ...ball,
              x: newX,
              y: newY,
            };
          });

          // Düşen topları kontrol et
          const activeBalls = updatedBalls.filter((ball) => {
            // Kutuya ulaşan topları kontrol et
            if (ball.y > height - 120 && ball.isDirected) {
              return !checkBallReached(ball);
            }

            // Yönlendirilmeden düşen topları kontrol et
            if (ball.y > height - 100 && !ball.isDirected) {
              endGame();
              return false;
            }

            return true;
          });

          return activeBalls;
        });

        // Yeni top spawn zamanı - zamanlayıcı tabanlı (her 40 frame'de bir = ~0.67 saniye)
        spawnTimer.current++;
        if (spawnTimer.current >= 40) {
          spawnTimer.current = 0;
          spawnBall();
        }
      }, 16); // ~60 FPS

      return () => {
        if (gameLoop.current) {
          clearInterval(gameLoop.current);
        }
      };
    }
  }, [gameState, speed]);

  // Top yakalama ve yönlendirme
  const directBall = (ballId, targetColorId, boxIndex) => {
    setBalls((prevBalls) => {
      return prevBalls.map((ball) => {
        if (ball.id === ballId && !ball.isDirected) {
          // Kutu merkezini hesapla
          const boxWidth = width / 4;
          const targetX = boxIndex * boxWidth + (boxWidth / 2) - (BALL_SIZE / 2);

          return {
            ...ball,
            targetX: targetX,
            isDirected: true,
            targetColorId: targetColorId,
          };
        }
        return ball;
      });
    });
  };

  // Topu kutuya ulaştığında kontrol et
  const checkBallReached = (ball) => {
    // Top kutu alanına ulaştı mı?
    if (ball.y > height - 120 && ball.isDirected) {
      // Renk kontrolü
      if (ball.colorId === ball.targetColorId) {
        // Doğru! Animasyonla kaybet
        Animated.timing(ball.fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          setBalls((prev) => prev.filter((b) => b.id !== ball.id));
        }, 200);

        // Puan artır
        setScore((prevScore) => {
          const newScore = prevScore + 1;

          // Her 5 puanda hızı artır
          if (newScore % 5 === 0) {
            setSpeed((prevSpeed) => prevSpeed + SPEED_INCREMENT);
          }

          return newScore;
        });

        return true;
      } else {
        // Yanlış renk - oyun bitti
        endGame();
        return true;
      }
    }
    return false;
  };

  // Oyunu bitir
  const endGame = () => {
    setGameState('gameOver');
    saveHighScore(score);

    if (gameLoop.current) {
      clearInterval(gameLoop.current);
    }
  };

  // Yasal belgeleri göster
  const showPrivacyPolicy = () => {
    setModalTitle('Gizlilik Politikası');
    setModalContent('privacy');
    setModalVisible(true);
  };

  const showTermsOfService = () => {
    setModalTitle('Kullanım Şartları');
    setModalContent('terms');
    setModalVisible(true);
  };

  // Link açma fonksiyonu
  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("URL açılamıyor: " + url);
      }
    } catch (error) {
      console.log('Link açılırken hata:', error);
    }
  };

  // Top bileşeni
  const Ball = ({ ball }) => {
    return (
      <Animated.View
        style={[
          styles.ball,
          {
            backgroundColor: ball.color,
            left: ball.x,
            top: ball.y,
            opacity: ball.fadeAnim,
          },
        ]}
      />
    );
  };

  // Menü ekranı
  if (gameState === 'menu') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.menuContainer}>
          <Text style={styles.title}>🎨 ColorDrop</Text>
          <Text style={styles.subtitle}>Topları doğru renge yönlendir!</Text>

          <View style={styles.highScoreContainer}>
            <Text style={styles.highScoreLabel}>En Yüksek Skor</Text>
            <Text style={styles.highScoreValue}>{highScore}</Text>
          </View>

          <TouchableOpacity style={styles.playButton} onPress={startGame}>
            <Text style={styles.playButtonText}>OYNA</Text>
          </TouchableOpacity>

          <View style={styles.instructions}>
            <Text style={styles.instructionText}>📌 Nasıl Oynanır:</Text>
            <Text style={styles.instructionDetail}>• Toplar yukarıdan düşer</Text>
            <Text style={styles.instructionDetail}>• Ekrana dokun ve topu doğru kutuya yönlendir</Text>
            <Text style={styles.instructionDetail}>• Her doğru eşleşme = 1 puan</Text>
            <Text style={styles.instructionDetail}>• Yanlış renk veya kaçırma = oyun biter</Text>
            <Text style={styles.instructionDetail}>• Hız giderek artar!</Text>
          </View>

          <View style={styles.legalLinks}>
            <TouchableOpacity onPress={showPrivacyPolicy}>
              <Text style={styles.legalLinkText}>Gizlilik Politikası</Text>
            </TouchableOpacity>
            <Text style={styles.legalDivider}>•</Text>
            <TouchableOpacity onPress={showTermsOfService}>
              <Text style={styles.legalLinkText}>Kullanım Şartları</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.supportLink}
            onPress={() => openLink('mailto:support@szrgame.com')}
          >
            <Text style={styles.supportLinkText}>📧 Destek: support@szrgame.com</Text>
          </TouchableOpacity>
        </View>

        {/* Yasal Belgeler Modal */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              {modalContent === 'privacy' ? (
                <View>
                  <Text style={styles.modalText}>
                    {privacyPolicyText}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.modalText}>
                    {termsOfServiceText}
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }

  // Oyun bitti ekranı
  if (gameState === 'gameOver') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverTitle}>Oyun Bitti!</Text>

          <View style={styles.scoreCard}>
            <Text style={styles.finalScoreLabel}>Skorun</Text>
            <Text style={styles.finalScoreValue}>{score}</Text>

            {score >= highScore && score > 0 && (
              <Text style={styles.newRecordText}>🎉 YENİ REKOR!</Text>
            )}

            <View style={styles.divider} />

            <Text style={styles.bestScoreLabel}>En İyi Skorun</Text>
            <Text style={styles.bestScoreValue}>{highScore}</Text>
          </View>

          <TouchableOpacity style={styles.restartButton} onPress={startGame}>
            <Text style={styles.restartButtonText}>🔄 Tekrar Oyna</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setGameState('menu')}
          >
            <Text style={styles.menuButtonText}>Ana Menü</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Oyun ekranı
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Skor göstergesi */}
      <View style={styles.scoreBar}>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>SKOR</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>REKOR</Text>
          <Text style={styles.scoreValue}>{highScore}</Text>
        </View>
      </View>

      {/* Oyun alanı */}
      <View style={styles.gameArea}>
        {balls.map((ball) => (
          <Ball key={ball.id} ball={ball} />
        ))}
      </View>

      {/* Renkli kutular */}
      <View style={styles.boxContainer}>
        {COLORS.map((color, index) => (
          <TouchableOpacity
            key={color.id}
            style={[styles.colorBox, { backgroundColor: color.color }]}
            activeOpacity={0.7}
            onPress={() => {
              // Henüz yönlendirilmemiş en yakın topu bul
              const closestBall = balls
                .filter((b) => !b.isDirected && b.y > 0 && b.y < height - 150)
                .sort((a, b) => b.y - a.y)[0];

              if (closestBall) {
                directBall(closestBall.id, color.id, index);
              }
            }}
          >
            <Text style={styles.boxLabel}>{color.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 40,
  },
  highScoreContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 40,
    alignItems: 'center',
    minWidth: 200,
  },
  highScoreLabel: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 5,
  },
  highScoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFCC00',
  },
  playButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 60,
    paddingVertical: 18,
    borderRadius: 30,
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  instructions: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 20,
    maxWidth: 350,
  },
  instructionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructionDetail: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 5,
    paddingLeft: 10,
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  gameOverTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 30,
  },
  scoreCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    minWidth: 280,
  },
  finalScoreLabel: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 5,
  },
  finalScoreValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  newRecordText: {
    fontSize: 18,
    color: '#FFCC00',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 20,
  },
  bestScoreLabel: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 5,
  },
  bestScoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFCC00',
  },
  restartButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  scoreBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  scoreItem: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  gameArea: {
    flex: 1,
    backgroundColor: '#16213e',
  },
  ball: {
    position: 'absolute',
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  boxContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
    elevation: 10,
  },
  colorBox: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  boxLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  legalLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  legalLinkText: {
    color: '#888',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  legalDivider: {
    color: '#666',
    fontSize: 12,
    marginHorizontal: 10,
  },
  supportLink: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  supportLinkText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalText: {
    fontSize: 14,
    color: '#ddd',
    lineHeight: 22,
    marginBottom: 20,
  },
});
