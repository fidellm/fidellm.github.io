
class translate_binary():
    
    def __init__(self, text):
        self.text = str(text)

    def str_bin(self):
        def letra_to_bin(letr_a):
            letr_a = ord(letr_a)
            if letr_a >= 128:
                bit1 = "1"
                letr_a = letr_a - 128
            else:
                bit1 = "0"
            if letr_a >= 64:
                bit2 = "1"
                letr_a = letr_a - 64
            else:
                bit2 = "0"
            if letr_a >= 32:
                bit3 = "1"
                letr_a = letr_a - 32
            else:
                bit3 = "0"
            if letr_a >= 16:
                bit4 = "1"
                letr_a = letr_a - 16
            else:
                bit4 = "0"
            if letr_a >= 8:
                bit5 = "1"
                letr_a = letr_a - 8
            else:
                bit5 = "0"
            if letr_a >= 4:
                bit6 = "1"
                letr_a = letr_a - 4
            else:
                bit6 = "0"
            if letr_a >= 2:
                bit7 = "1"
                letr_a = letr_a - 2
            else:
                bit7 = "0"
            if letr_a >= 1:
                bit8 = "1"
                letr_a = letr_a - 1
            else:
                bit8 = "0"
            letr_bin = (bit1 + bit2 + bit3 + bit4 + bit5 + bit6 + bit7 + bit8)
            return letr_bin
        textbin = """"""
        for ch in self.text:
            ch = letra_to_bin(ch)
            textbin = str(textbin + " " + ch)
            
        return textbin


    def bin_str(self):
        def to_str(text):
            text = str(text)
        to_str(self.text)
        def bin_to_letra(b):
            #bin_ary = bin_ary.split()
            # 0 = 128, 1 = 64, 2 = 32, 3 = 16, 4 = 8, 5 = 4, 6 = 2, 7 = 1
            num = 0
            if b[0] == "1":
                num = 128
            if b[1] == "1":
                num = num + 64
            if b[2] == "1":
                num = num + 32
            if b[3] == "1":
                num = num + 16
            if b[4] == "1":
                num = num + 8
            if b[5] == "1":
                num = num + 4
            if b[6] == "1":
                num = num + 2
            if b[7] == "1":
                num = num + 1
            ltr = chr(num)
            return ltr
        texto = """"""
        text = self.text.split(" ")
        if " " in text[0]:
            text[:0]
        for ch in text:
            try:
                if ch == " ":
                    pass
                ch = bin_to_letra(ch)
                texto = (texto + ch)
            except:
                pass

        return texto
        
