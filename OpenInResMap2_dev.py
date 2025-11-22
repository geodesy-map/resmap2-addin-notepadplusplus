import base64
import zlib
import os
import tempfile
from Npp import editor, notepad

def compress_to_uri_component(text):
    utf8_bytes = text.encode('utf-8')
    compressed = zlib.compress(utf8_bytes, 9)
    b64 = base64.urlsafe_b64encode(compressed)
    return b64.rstrip('=')

def open_in_viewer():
    content = editor.getText()
    
    if not content:
        notepad.messageBox("Le fichier est vide.", "Erreur", 0)
        return
    
    filename = notepad.getCurrentFilename()
    if not filename.lower().endswith('.prnx'):
        result = notepad.messageBox(
            "Ce fichier n'est pas un .PRNx. Continuer quand meme ?",
            "Attention",
            4
        )
        if result != 6:
            return
    
    try:
        compressed = compress_to_uri_component(content)
        base_url = "https://votre-app.com"
        url = base_url + "/#" + compressed
        
        # Creer un fichier HTML temporaire qui redirige
        html_content = '''<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script>
        window.location.href = "''' + url + '''";
    </script>
</head>
<body>
    <p>Redirection en cours...</p>
</body>
</html>'''
        
        # Ecrire dans un fichier temporaire
        temp_path = os.path.join(tempfile.gettempdir(), "ltop_redirect.html")
        with open(temp_path, 'w') as f:
            f.write(html_content)
        
        # Ouvrir le fichier HTML
        os.startfile(temp_path)
        
    except Exception as e:
        notepad.messageBox("Erreur: " + str(e), "Erreur", 0)

open_in_viewer()