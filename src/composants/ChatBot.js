import React, { useState } from 'react';
import bot from '../img/bot.png'

const ChatBot = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleSendMessage = async () => {
        try {
            const res = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input }),
            });

            const data = await res.json();
            setResponse(data.generated_text || 'Je dois me reposer un moment, revenez un peu plus tard.');
        } catch (error) {
            setResponse('Erreur lors de l\'envoi de la requête.');
        }
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const isButtonDisabled = !input.trim();

    return (
        <div style={{ position: 'fixed', bottom: '65px', right: '15px', zIndex: 1000}}>
            {/* Icône de chatbot */}
            <div 
                onClick={toggleChat}
                style={{ 
                    width: '60px', 
                    height: '60px', 
                    backgroundColor: 'brown', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    cursor: 'pointer' 
                }}
            >
                <img src={bot} style={{height:'39px', borderRadius:'50px'}} alt='Neo, le bot'/>
            </div>

            {/* Fenêtre de chat */}
            {isChatOpen && (
                <div style={{ 
                    position: 'absolute', 
                    bottom: '80px', 
                    right: '0', 
                    width: '316px', 
                    maxHeight: '50vh',
                    overflowY: 'auto',
                    padding: '20px', 
                    backgroundColor: '#fff', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                    borderRadius: '10px' 
                }}>
                    <h3>Neo, votre assistant !</h3>
                    {/* Zone de texte pour les questions multi-lignes */}
                    <textarea 
                        id="chatInput"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Vous voulez mieux connaître Dimitri ou simplement discuter ? Je vous écoute :"
                        rows={3}
                        style={{ 
                            padding: '10px', 
                            width: '100%', 
                            resize: 'none',
                            borderRadius: '5px', 
                            border: '1px solid #ccc' 
                        }}
                    />
                    <button 
                        onClick={handleSendMessage} 
                        style={{ 
                            padding: '10px', 
                            marginTop: '10px', 
                            width: '100%',
                            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
                            backgroundColor: isButtonDisabled ? '#ccc' : 'brown', 
                            color: 'white',
                            border: 'none',
                        }} 
                        disabled={isButtonDisabled}
                    >
                        Envoyer
                    </button>
                    <div 
                        style={{ 
                            marginTop: '10px', 
                            maxHeight: '150px',  
                            overflowY: 'auto'
                        }}
                    >
                        <p><strong>Neo :</strong> {response}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
