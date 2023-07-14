from flask import Flask, render_template, request, redirect, url_for, flash

import translate_bin as traductor

app = Flask(__name__)


# Settings
app.secret_key = "mysecretkey"


@app.route('/')
def Index():
    return render_template("index.html")

@app.route('/translate_to_binary', methods = ['POST'])
def translate():
    if request.method == 'POST':
        text = request.form['text']
        
        binario = ""
        binario = traductor.translate_binary(text=text).str_bin()
        
        flash(binario)
        
        print(text)
        return redirect(url_for('Index'))


@app.route('/translate_to_text', methods = ['POST'])
def translate_to_text():
    if request.method == 'POST':
        text = request.form['text']
        
        devolver = ""
        devolver = traductor.translate_binary(text=text).bin_str()
        
        flash(devolver)
        
        print(text)
        return redirect(url_for('Index'))
    

if __name__ == '__main__':
    app.run(port = 3000, debug = True)
