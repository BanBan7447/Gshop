import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, createContext, useEffect } from 'react'

// Kho dữ liệu chung cho cả ứng dụng
const AppContext = createContext();
const AppProvider = (props) => {
    const { children } = props;
    const [users, setUsers] = useState(null);
    // const [cart, setCart] = useState(null);
    const [viewer, setViewer] = useState(null);

    const [news, setNews] = useState([
        {
          _id: 1,
          images: [
            'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/479519798_577661135274487_4029274036259800995_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=kXs3C7bOdccQ7kNvgFTTiA9&_nc_oc=AdjqFe7PDTLmqxj6dq7GqFsZI2Oze2GriRfpuabE5rqSpagqL2SLKwULlbhvz-xMlzs&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=ALpQOCxooa8qln4H9s4PTKK&oh=00_AYA96rTqRhwewnFeI5WkGKiLmSgqO3gGBZNH2UkG1-_xDw&oe=67B391F7'
          ],
          title: "Bandai Namco đầu tư 130 triệu USD vào Gundam Metaverse",
          content: `Công ty đồ chơi và trò chơi điện tử Bandai Namco Holdings đang đầu tư 15 tỉ yên (khoảng 130 triệu USD) để phát triển Gundam Metaverse, với loạt robot chiến đấu và nhân vật đặc trưng từ thương hiệu Gundam nổi tiếng.
          
Kế hoạch đầu tư vào Gundam Metaverse đã được Bandai Namco công bố vào tháng 2, trong bối cảnh xu hướng vũ trụ ảo metaverse phát triển mạnh mẽ và các công ty công nghệ lớn đang đua nhau xây dựng nền tảng ảo để gia tăng doanh thu.
    
Dự án ""Mobile Suit Gundam Metaverse"" sẽ kết hợp các trò chơi, video, nhạc sống và nhiều nội dung khác, đồng thời kết nối với các website thực tế do nhóm công ty Bandai Namco điều hành, như cửa hàng bán đồ chơi, game hay mô hình nhựa.
    
Một video mô phỏng về Gundam Metaverse cho thấy người dùng có thể tham gia một buổi hòa nhạc, giao tiếp với nhau qua dịch tự động và mua các mô hình nhựa Gundam, sau đó sản phẩm sẽ được chuyển đến nhà của họ ngoài đời thực.
    
Kể từ khi ra mắt dưới dạng phim truyền hình dài tập tại Nhật Bản hơn 40 năm trước, những câu chuyện về robot chiến đấu ngoài không gian và kiếm hiệp của Gundam vẫn thu hút nhiều thế hệ người hâm mộ trên toàn cầu.
    
Chủ tịch Bandai Namco, ông Masaru Kawaguchi, chia sẻ: ""Gundam Metaverse sẽ là một cơ hội để chúng tôi kết nối sâu sắc hơn với người hâm mộ"", đồng thời tiết lộ rằng công ty cũng có kế hoạch phát triển các siêu phẩm cho các nhượng quyền thương mại khác của mình.
    
Dự án Gundam Metaverse sẽ được quản lý bởi mảng kinh doanh kỹ thuật số của Bandai Namco, Bandai Namco Entertainment(BNE).Đơn vị này đã và đang thúc đẩy các cải tiến trong công nghệ đồ họa máy tính và phân tích dữ liệu qua những trò chơi khác của công ty.
    
Giám đốc điều hành của BNE, ông Koji Fujiwara, được gọi là ""giám đốc Gundam"" nhờ kinh nghiệm lâu năm trong lĩnh vực sản xuất mô hình Gundam bằng nhựa.Ông sẽ chịu trách nhiệm tổng hợp nhân lực và nguồn lực thương mại từ toàn bộ nhóm để thúc đẩy dự án.`,
          date: "06/04/2024"
        },
    
        {
          _id: 2,
          images: [
            'https://gamek.mediacdn.vn/133514250583805952/2024/4/2/photo-1712044327028-17120443272461779605534.png',
            'https://gamek.mediacdn.vn/133514250583805952/2024/4/2/photo-1712044251456-17120442517321114215346.png',
            'https://gamek.mediacdn.vn/133514250583805952/2024/4/2/photo-1712044268935-17120442690681432290411.png'
          ],
          title: "Fan nói lời tạm biệt với mô hình Gundam cao 18m có thể cử động",
          content: `Gundam Factory Yokohama đã vinh danh buổi lễ bế mạc Gundam RX-78F00 với vô vàn cảm xúc và sự trân trọng, chạm đến trái tim của những người hâm mộ Gundam trên toàn thế giới. Sự kiện lịch sử này được truyền hình trực tiếp trên kênh YouTube chính thức của GTA, mang đến cho người hâm mộ trên toàn thế giới một buổi lễ tiễn biệt đầy xúc động.
    
Buổi triển lãm đã chính thức kết thúc sự trì hoãn nghỉ hưu mô hình Gundam RX-78F00 sau thời gian 4 năm, kể từ lúc khánh thành và 2 lần trì hoãn việc ngưng hoạt động.
    
Điểm nổi bật của sự kiện là phần trình bày đặc biệt giới thiệu thử nghiệm cuối cùng của Gundam RX-78F00. Những người tham dự đã rất ngạc nhiên và xúc động khi nhận được tin nhắn âm thanh từ Amuro Ray, phi công đầu tiên của chiếc RX-78-2 GTA, thông qua trí tuệ nhân tạo (AI).
    
Thông điệp này tràn đầy hy vọng và khao khát, nói về một kỷ nguyên hòa bình mới, đóng vai trò như một lời nhắc nhở mạnh mẽ về các giá trị hòa bình và nhân loại lâu đời của loạt phim Gundam.
    
"Khi tôi thức dậy lần nữa... Đó sẽ là một kỷ nguyên hòa bình, nơi MS và Gundams sẽ góp phần mang lại hạnh phúc cho con người..." - Amuro Ray
    
Sự kiện kết thúc có thêm các màn trình diễn pháo hoa và máy bay không người lái, cũng như các bài hát chủ đề từ loạt phim ""Gundam Witch from Mercury"" và bộ phim ""Mobile Suit GTA SEED Freedom"" mới nhất. Những màn trình diễn này, đặc biệt là hình bóng được ghi lại bằng máy bay không người lái của GTA, đã gây ấn tượng mạnh với người hâm mộ, gợi lại hình ảnh nổi tiếng của bộ phim hoạt hình gốc ""Mobile Suit"" năm 1979.
    
Con robot khổng lồ này đã chính thức ra mắt công chúng vào ngày 19 tháng 12 năm 2020, cho phép người hâm mộ và du khách từ khắp nơi trên thế giới trải nghiệm công trình thiết kế và kỹ thuật cơ khí đáng kinh ngạc.`,
          date: "02/04/2024"
        },
    
        {
          _id: 3,
          images: [
            'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/479485770_577662681940999_6105025487065247823_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=_ZHkGjCMf0UQ7kNvgHvBIuA&_nc_oc=Adh06zv3sMY-cdZnZDJdjwficmh0hnPtM5YXVf-12aJVhbEqi8MqZXLODYTW4gu-rYU&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AQaaRrg2lm3frOZw2gw14G8&oh=00_AYBfxHjrOKmhby6kXmnqNtrWTFdM5XML5gcfDlLNf3aglA&oe=67B3804A',
            'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/479520555_577662688607665_2250064867559477734_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=rtidMLKL-_AQ7kNvgGot_DI&_nc_oc=AdirJJbmsFplI7uho_ofVyk8BG3rkaYs_xzQYjAz4w3mT8_el1DWQG0I_RNTw0SsuY0&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A2iyfzqkR7TVy9NtBlqh6uN&oh=00_AYDhovEXtxLa8jCyIv-H3PlC_ruyBDOUu_OgvQdQl07gew&oe=67B3785F',
            'https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/479486671_577662691940998_3207615785539887840_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=aeewaqH1op8Q7kNvgEeNM76&_nc_oc=Adj6_l4B33nl_hEefL9GGmv0m1CV0fcBLTj_DfXIgmadKnzEKMaWFFwzpnmVJb8tgkk&_nc_zt=23&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=A_Lw2rxaZJEpd6irriB0kya&oh=00_AYDbjvlIsIm-WQxA32HIQMslSodtYzjUontMUn4ydxb_jQ&oe=67B36D8E',
            'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/477577568_577662825274318_4000906741898601911_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ZgjgWbaNF4UQ7kNvgHUZ0gm&_nc_oc=Adg0pdO1xLf_FaPanHnS3UhVc3w00ueFFfU4EoHRAqb6Q97-_upw15CtpfVf8PIBo3U&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=ALxmi2ivVHNEUg_t1wXQlP4&oh=00_AYCW4vbZ_9yB17aGXw_tVD_7nkBYScB1YvYI0L1NBaD0IQ&oe=67B38BF6',
            'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/479499379_577662831940984_7246630787413244252_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=1AVgnAS3MaUQ7kNvgHrbx6U&_nc_oc=Adj49JiFtWgCUT_5cS4k61lQAlaBrimwruGGnxdbHrOZ83RTEc5oxOp1HI8Um8Ad_IM&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AO-kAkwaX3GMZVFhetfjpv2&oh=00_AYBgtP6Q_6YHw_7c0MAA_aDg506DAigMFDF3nLTBYxR3jw&oe=67B37A06'
          ],
          title: "Mobile Suit Gundam: Cucuruz Doan's Island đưa khán giả trở về tuổi thơ với trải nghiệm đã tai, sướng mắt hơn",
          content: `Được xem như tác phẩm Gundam cuối cùng của đạo diễn huyền thoại Yoshikazu Yasuhiko - người đã đạo diễn 6 phần OVA Gundam Origin và bộ phim Mobile Suit Gundam F91. Mobile Suit Gundam: Cucuruz Doan's Island ngay khi vừa ra mắt đã khiến biết bao người hâm mộ phải vừa trông đợi nhưng cũng vừa tiếc nuối.
    
Theo thông tin từ nhà sản xuất, kịch bản của Mobile Suit Gundam: Cucuruz Doan's Island được lấy từ tập 15 của loạt phim anime gốc. Thời điểm đó, cha đẻ của bộ phim - ngài Yoshiyuki Tomino đã yêu cầu Bandai Entertainment bỏ tập này khỏi bản phát hành chính thức. Vì vậy, rất nhiều khán giả đã không được xem nội dung tập phim này mà chuyển thẳng đến tập 16 có tên: Sayla’ Agony.
    
Cũng chính vì điều đó, câu chuyện trong Mobile Suit Gundam: Cucuruz Doan's Island còn đáng trông đợi hơn nữa khi kịch bản được cha đẻ của Gundam nhào nặn từ lâu, nhưng kỹ thuật làm phim thì lại rất hiện đại.
    
Liệu sự giao thoa giữa quá khứ và hiện tại sẽ tạo nên một tác phẩm ra sao?
    
Bộ phim có hình họa và kỹ xảo cực đẹp
    
Ngay từ đầu, giới phê bình đã đánh giá Mobile Suit Gundam: Cucuruz Doan's Island là một tác phẩm được đầu tư phần nhìn rất cao bởi sự góp mặt của hai ""bậc thầy"" thao túng thị giác Atsushi Tamura (Weathering With You) và Tsukasa Kotobuki (Mobile Suit Gundam: The Origin). Nhưng chỉ khi lên phim mới vỡ òa khi thấy từng đường nét của Gundam vẫn giữ nguyên, trong khi kỹ xảo trong những đại cảnh chiến đấu lại được nâng cấp đến mức khó tin.
    
Sự hoài cổ trong phim như mang người xem quay lại thời điểm lần đầu được thấy Gundam trên chiếc TV nhỏ, vừa háo hức, phấn khích nhưng cũng có chút đáng sợ. Giờ đây khi xem lại Gundam trên màn ảnh rộng cảm giác phấn khích vẫn vẹn nguyên, có chăng là hồi hộp và căng thẳng hơn, vì cách kể chuyện của phim điện ảnh chắc chắn là kịch tính hơn rồi!
    
Nội dung phim không chỉ là cuộc đấu tranh giữa những chiếc Mobile Suit hùng mạnh
Ngoài khía cạnh hành động của phim, Mobile Suit Gundam: Cucuruz Doan's Island còn mang tới cho khán giả một câu chuyện cực xúc động giữa Cucuruz Doan - một cựu phi công Zaku cho Công quốc Zeon đã đào ngũ, chọn cuộc sống thiếu thốn nhưng an lành, bình dị cũng những đứa trẻ trên hòn đảo xa.
    
Cách Doan và những đứa trẻ học cách nương tựa vào nhau, cùng nhau sinh tồn, tự cung tự cấp trên hoang đảo thật sự truyền cảm hứng, mang lại cho người xem cảm giác yên bình giữa nhịp điệu căng thẳng của phim.
    
Tuy đào ngũ, từ bỏ công việc của một người lính nhưng Cucuruz Doan chưa hề đánh mất cảm giác và bản năng của mình. Ngay khi có sự xâm phạm, Doan ngay lập tức bắt những kẻ bên ngoài phải trả một cái giá thật đắt. Chính điểm này khiến nhân vật Cucruruz Doan trở thành một nhân tố khó đoán, đầy tình cảm nhưng cũng rất quyết liệt. Hứa hẹn sẽ để lại cho khán giả một góc nhìn mới trong câu chuyện về Gundam.
    
Những vấn đề thời đại cũng được đem ra mổ xẻ
    
Không vì Gundam là một thương hiệu lâu đời mà phim thiếu đi tính thời đại cần có. Bộ phim đã làm nhiều khán giả bất ngờ bởi nhiều chi tiết đánh mạnh vào yếu tố tâm lý - vấn đề đang được quan tâm bậc nhất trong thế hệ sau này. Quá khứ của Amuro đã được đào sâu hơn, những ám ảnh tâm lý trong quá trình trưởng thành của nhân vật được đánh giá đúng và xử lý - tuy chưa sâu sắc nhưng có giá trị về nhận thức cao. Giúp những khán giả với câu chuyện tương tự nhìn thấy mình trong đó và tìm được cách xử lý tốt hơn.`,
          date: "19/05/2022"
        },
    
        {
          _id: 4,
          images: [
            'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/479525270_577671201940147_4960674434349341473_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=RXzq4SGQdYYQ7kNvgFZryrt&_nc_oc=Adh2tudemiydNydmuQVwXreFo3_N34U_ZKlGCJgVF0jecvjENliPiE4wx-ckCS7BQgs&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=AcpANgczIwPfYB0pO4atrCU&oh=00_AYCuKIbMPfHeRtMFcEdlgYuWGG1CtUQJnQVD6vwAJodsaQ&oe=67B372D2',
            'https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/477593462_577671198606814_5532224509382105533_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VQsUrjwPC8AQ7kNvgG7gDDk&_nc_oc=AdhnU727vme4TenS4h-EheBHO84boWSa6wAbd-Y4e_FYmeS9dObPGZ7ODrsAI1rXiqo&_nc_zt=23&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=AHyK78S3mr2kYhs4vTomWxX&oh=00_AYC_jeb2naCVWCOrFelO8TKuCFiEEMEoudwlMYA-nwD_ug&oe=67B3893B',
            'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/479494444_577671195273481_4574110599869332435_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ol2ZB3h-dbgQ7kNvgF9khzv&_nc_oc=Adjwqgg-pCa4woWBB9nWqyFuvKOAlIyQ5dN7TvPYpsu22fLhP0ia8TlK0nZkfgrE2Ik&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=ATH-Xb2gNdAqbIa2Yh9WLRo&oh=00_AYBwJx_jgfL5Ae4R0S3qIQ1wifxmsk25vF1a_YoQLcJ5HQ&oe=67B382AF'
          ],
          title: "Cha đẻ của Elden Ring chơi lớn, đầu tư hẳn 3.000 tỷ để làm bom tấn mới, quy tụ vũ trụ Gundam đầy hấp dẫn",
          content: `Có thể nói trong bối cảnh mà làng game thế giới vừa mới hồi phục sau chuỗi khủng hoảng vì dịch bệnh, Elden Ring đã vươn mình lên trở thành một trong những bom tấn đáng chú ý nhất ở thời điểm hiện tại. Hưởng lợi lớn nhất, bên cạnh các game thủ có lẽ chính là Bandai Namco - nhà phát hành của tựa game đình đám này. Bên cạnh bảng thông báo tài chính bùng nổ ở các chỉ số lợi nhuận và doanh thu, Bandai Namco mới đây còn khiến nhiều người phải bất ngờ khi không hề giấu diếm dự án bom tấn tiếp theo của mình.
    
Theo đó, Bandai Namco vừa công bố kế hoạch phát triển một tựa game mới cùng với vô số nội dung Gundam mới cho người hâm mộ trên toàn thế giới. Về bản chất, NPH này vốn đã rất nổi tiếng trong việc đi đầu với chủ đề robot, Gundam rồi, thế nên, thông tin này có lẽ cũng không nhận được quá nhiều sự chú ý nếu như Bandai Namco không tiết lộ rằng đây sẽ là một tựa game eSports, thậm chí quy tụ cả yếu tố Metavaerse. 
    
Thực chất, các tựa game trước đây của Bandai Namco về Gundam cũng đã có những yếu tố PvP và dù chưa thật sự hấp dẫn nhưng chí ít, nó cũng tạo điểm nhấn đáng thú vị. Chưa kể, số tiền mà NPH này dự kiến sẽ đầu tư cho tựa game bom tấn mới cũng lên tới 130 triệu USD, tức là khoảng hơn 3.000 tỷ VND - một con số đủ để cho thấy mức độ chỉn chu và chau chuốt từ phía Bandai Namco.
    
Hiện tại, chưa có quá nhiều thông tin về tựa game này. Theo Chủ tịch Bandai Namco, ông Masaru Kawaguchi chia sẻ: “Gundam Metaverse sẽ là một cơ chế để chúng tôi kết nối sâu sắc hơn với người hâm mộ, đồng thời tiết lộ rằng công ty đã có kế hoạch tạo ra các siêu phẩm cho các nhượng quyền thương mại khác của mình. Dự án Gundam Metaverse sẽ được đảm nhận bởi một nhánh khác của công ty - Bandai Namco Entertainment (BNE).`,
          date: "21/04/2022"
        },
    
    
      ]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('userInfo');
                if (userData) {
                    setUsers(JSON.parse(userData))
                }
            } catch (e) {
                console.error("Lỗi khi lấy dữ liệu từ AsyncStorage:", error);
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    return (
        <AppContext.Provider value={{ users, setUsers, viewer, setViewer, news, setNews }}>
            {loading ? null : children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };