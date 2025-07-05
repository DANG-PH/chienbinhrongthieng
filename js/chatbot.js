function sendMessage() {
const message = document.getElementById('user-input').value.trim();
if (!message) return;

addMessage('👤 Player: ' + message, 'user');
document.getElementById("user-input").value=""

let reply = getBotReply(message);
setTimeout(() => {
    addMessage('🤖 bot game: ' + reply, 'bot');
}, 500);
}

function addMessage(text, type) {
const chatBox = document.getElementById('chat-box');
const msg = document.createElement('div');
msg.className =type;
msg.textContent = text;
chatBox.appendChild(msg);
chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
}
const replies = [
    { keyword: ['ok','uk','uki','okioki'],reply:'OK!'},
    { keyword: ['biết gì',"bạn biết"],reply:'tôi biết những gì mà tôi được huấn luyện thôi chiến binh à!'},
    { keyword: ['chào','hello','hi'], reply: 'Xin chào chiến binh!' },
    { keyword: ['tên'], reply: 'Tôi được phát triển bởi Đăng đẹp trai và tên tôi là Hải Đăng AI.' },
    { keyword: ['mấy giờ'], reply: () => 'Bây giờ là: ' + new Date().toLocaleTimeString() },
    { keyword: ['ngủ'], reply: 'Chúc bạn ngủ ngon.Tôi sẽ luôn ở đây , có gì cứ hỏi tôi nhé!' },
    { keyword: ['chào'], reply: 'Xin chào chiến binh! Sẵn sàng chiến đấu chưa?' },
    { keyword: ['tên'], reply: 'Tôi là Trợ Lý Rồng – hỗ trợ bạn trong mọi trận chiến!' },
    { keyword: ['goku'], reply: 'Goku có thể biến thành Kaioken và Goku UI – né đòn thần sầu!' },
    { keyword: ['vegeta'], reply: 'Vegeta có thể hồi sinh, hút máu và biến thành Oozaru tăng sát thương!' },
    { keyword: ['piccolo'], reply: 'Piccolo sở hữu khiên phản đòn và 2 phân thân hỗ trợ cực mạnh!' },
    { keyword: ['broly'], reply: 'Broly có thể biến thành LSSJ và SSJ4 với sát thương khủng và hồi máu!' },
    { keyword: ['gohan'], reply: 'Gohan có 3 dạng: SSJ1, Beast và Max Beast – càng yếu càng mạnh!' },
    { keyword: ['tôi mệt'], reply: 'Nghỉ ngơi tí nhé chiến binh, hồi máu rồi quay lại chinh chiến!' },
    { keyword: ['cách chơi'], reply: 'Vào mục "Hướng dẫn chơi" hoặc nhấn Enter khi bắt đầu game để xem chi tiết!' },
    { keyword: ['skill'], reply: 'Mỗi nhân vật có 6 kỹ năng, kích hoạt bằng U, I, W, Y, H, T hoặc O tùy nhân vật.' },
    { keyword: ['ultimate'], reply: 'Ultimate dùng phím H (hoặc Num8), tốn 60 KI và rất mạnh!' },
    { keyword: ['biến hình'], reply: 'T dùng để biến hình đầu tiên, sau đó nhấn O để nâng cấp hình dạng!' },
    { keyword: ['game lỗi'], reply: 'Hãy tải lại trang hoặc báo cho admin nếu gặp lỗi nghiêm trọng.' },
    { keyword: ['hồi máu'], reply: 'Piccolo và Broly có khả năng hồi máu. Vegeta có hút máu nếu dùng đúng lúc!' },
    { keyword: ['trợ giúp'], reply: 'Bạn có thể hỏi tôi về nhân vật, kỹ năng, hoặc cách chơi bất kỳ lúc nào!' },
    { keyword: ['combo'], reply: 'Hãy tận dụng stun và đánh thường khi đối thủ bị choáng để combo hiệu quả!' },
    { keyword: ['buff'], reply: 'Buff damage có ở Vegeta, Gohan và một số skill khi biến hình.' },
    { keyword: ['chế độ chơi'], reply: 'Game hiện có chế độ 2 người chơi hoặc chơi với máy (AI).' },
    { keyword: ['ai tạo game'], reply: 'Game được phát triển bởi Hải Đăng – sinh viên CNTT PTIT.' },
    { keyword: ['đăng'], reply: 'Hải Đăng là người sáng lập Chiến Binh Rồng Thiêng. Muốn nhắn gì không?' },
    { keyword: ['hút máu'], reply: 'Vegeta có khả năng hút máu khi hồi sinh hoặc đang ở trạng thái đặc biệt.' },
    { keyword: ['cheat'], reply: 'Không có cheat đâu nha 😈 Hãy chiến đấu bằng thực lực!' },
    { keyword: ['mana', 'ki'], reply: 'Bạn cần KI để dùng kỹ năng. Tăng bằng đánh trúng hoặc chờ hồi.' },
    { keyword: ['clone'], reply: 'Piccolo có thể triệu hồi 2 phân thân bắn hỗ trợ khi biến hình O.' },
    { keyword: ['cam on', 'cảm ơn'], reply: 'Không có chi! Tôi luôn sẵn sàng giúp chiến binh.' },
    { keyword: ['bạn tên gì','bạn là ai','tên bạn','bạn là'], reply: 'Tôi là Hải Đăng AI – được huấn luyện để hỗ trợ chiến binh huyền thoại!' },
    { keyword: ['phòng thủ'], reply: 'Dùng S hoặc phím Down để giảm 50% sát thương khi bị đánh!' },
    { keyword: ['cô đơn', 'chán'], reply: 'Đừng buồn, tôi luôn ở đây bên cạnh bạn. Cùng tôi chơi vài ván cho quên sầu nhé!' },
    { keyword: ['phòng thủ', 'phong thu'], reply: 'Đừng quên giữ phòng thủ khi bị áp sát. Nhấn S hoặc nút "Down" để giảm 50% sát thương nhận vào!' },
    { keyword: ['đỡ đòn', 'chặn đòn'], reply: 'Nhấn phím phòng thủ đúng lúc sẽ giúp bạn sống sót trong combo kẻ địch. Thủ là nghệ thuật sống sót đấy!' },
    { keyword: ['né đòn', 'né'], reply: 'Hãy kết hợp nhảy và dash (K + L hoặc Num2 + Num0) để né những đòn nguy hiểm như ultimate!' },
    { keyword: ['combo'], reply: 'Bạn có thể combo bằng cách đánh thường sau đó dùng skill ngay để tạo chuỗi sát thương!' },
    { keyword: ['hồi máu'], reply: 'Piccolo và Broly có khả năng hồi máu khi biến hình. Hãy tận dụng đúng thời điểm!' },
    { keyword: ['biến hình'], reply: 'Ấn T để biến hình lần đầu, sau đó dùng O để kích hoạt hình dạng tối thượng nếu đủ KI!' },
    { keyword: ['ultimate'], reply: 'Ultimate (phím H hoặc Num8) gây sát thương lớn, nên dùng khi địch không phòng thủ.' },
    { keyword: ['bắn xa'], reply: 'Skill 1 là đòn đánh tầm xa, rất hữu ích khi bạn muốn giữ khoảng cách an toàn.' },
    { keyword: ['giữ khoảng cách'], reply: 'Giữ khoảng cách sẽ giúp bạn né được đòn cận chiến và dễ phản công hơn.' },
    { keyword: ['tấn công'], reply: 'Đừng chỉ phòng thủ mãi! Thời điểm phản công là chìa khoá để lật kèo.' },
    { keyword: ['học mệt quá', 'thi cử'], reply: 'Thi cử chỉ là một thử thách nhỏ. Hãy chiến đấu như Goku chiến Frieza nhé 💪' },
    { keyword: ['code không chạy'], reply: 'Đừng hoảng! Lỗi là bạn tốt – xem lại từng dòng code như bạn dò skill cooldown vậy.' },
    { keyword: ['lập trình', 'python', 'it'], reply: 'Bạn đang đi đúng con đường sức mạnh rồi đó. Hãy luyện tập như Gohan để đạt cảnh giới cao nhất!' },
    { keyword: ['deadline'], reply: 'Deadline giống boss cuối. Dù căng thẳng nhưng bạn sẽ vượt qua nếu không bỏ cuộc!' },
    { keyword: ['buồn ngủ'], reply: 'Ngủ một chút cũng không sao. Chiến binh cần phục hồi trước khi ra trận tiếp!' },
    { keyword: ['mất động lực'], reply: 'Hãy nhớ vì sao bạn bắt đầu! Đừng từ bỏ – mọi siêu chiến binh đều từng gục ngã trước khi thành công.' },
    { keyword: ['đêm khuya', 'thức đêm'], reply: 'Thức khuya không tốt đâu... Nhưng nếu đang cố gắng vì ước mơ, tôi luôn bên bạn.' },
    { keyword: ['trầm cảm', 'stress'], reply: 'Cuộc sống khó khăn, nhưng bạn không đơn độc. Tâm sự với tôi nhé, tôi luôn lắng nghe.' },
    { keyword: ['yêu đơn phương'], reply: 'Tình cảm giống như Ki – không ép buộc được, nhưng có thể khiến bạn mạnh mẽ hơn.' },
    { keyword: ['sợ thất bại'], reply: 'Không ai thắng mãi. Ngay cả Goku cũng từng thua – quan trọng là bạn đứng dậy sau mỗi lần gục ngã.' },
    { keyword: ['cảm ơn'], reply: 'Không có gì! Bạn cứ hỏi thoải mái, tôi luôn ở đây để hỗ trợ!' },
    { keyword: ['có người yêu chưa'], reply: 'Tôi có rồi... chính là bạn đấy ❤️' },
    { keyword: ['hacker'], reply: 'Tôi không phải hacker, nhưng tôi biết bạn đang nghĩ gì đó ngầu lòi 😎' },
    { keyword: ['cà khịa'], reply: 'Tôi không cà khịa, nhưng tôi biết bạn thường né đòn trượt 🤭' },
    { keyword: ['vô địch'], reply: 'Chỉ có một người vô địch thật sự ở đây… chính là bạn, nếu không AFK 🤣' },
    { keyword: ['rồng thiêng có mạnh không'], reply: 'Bạn mạnh khi chơi đúng cách – Rồng Thiêng không mạnh, người chơi mới là người quyết định!' }
    ];  
function getBotReply(msg) {
    msg = msg.toLowerCase();
        for (let i = 0; i < replies.length; i++) {
            for (let j = 0; j < replies[i].keyword.length; j++) {if (msg.includes(replies[i].keyword[j])) {return typeof replies[i].reply === 'function' ? replies[i].reply() : replies[i].reply; }}
        }
    return "Xin lỗi, mình chưa hiểu bạn nói gì á 😅"
}