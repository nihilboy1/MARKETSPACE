saldo_atual = 82.75
valor_perdido_X = 5.00
odd_X = 1.55


def range_float(start, stop, step):
    result = []
    while start < stop:
        result.append(round(start, 2))
        start += step
    return result


def calcular_lucro(saldo_atual, valor_perdido_X, odd_X):
    faturamento_X = round(valor_perdido_X * odd_X, 2)
    lucro_X = round(faturamento_X - valor_perdido_X, 2)

    possivel_valor_perdido_Y = round((lucro_X * 50) / 100, 2)
    valor_perdido_X_Y = round(possivel_valor_perdido_Y + valor_perdido_X, 2)

    print("-" * 50)
    print("APOSTANDO APENAS EM X")
    print("Saldo inicial: ", saldo_atual)
    print("Valor apostado/perdido: ", valor_perdido_X)
    print(
        "Faturamento em caso de vitória de X: ",
        faturamento_X,
    )
    print(
        "Lucro da aposta X: ",
        lucro_X,
    )
    print("Saldo final: ", round(saldo_atual + lucro_X, 2))

    print("\n")

    for possivel_odd_Y in range_float(round(2.5 * odd_X, 2), 8.0, 0.1):
        possivel_faturamento_Y = round(possivel_valor_perdido_Y * possivel_odd_Y, 2)
        possivel_lucro_Y = round(possivel_faturamento_Y - possivel_valor_perdido_Y, 2)
        print("-" * 50)
        print("APOSTANDO EM X E Y")
        print("Saldo inicial: ", saldo_atual)
        print(
            "Valor perdido X: ",
            valor_perdido_X,
            " | " "Valor perdido Y: ",
            possivel_valor_perdido_Y,
        )
        print("Valor perdido X e Y: ", valor_perdido_X_Y)
        print(
            "Lucro da aposta X tendo apostado também em Y: ",
            lucro_X - possivel_valor_perdido_Y,
        )
        print(
            "Lucro da aposta Y tendo apostado também em X: ",
            possivel_lucro_Y - valor_perdido_X,
        )

        X_ganha_apostando_em_X_e_Y = (saldo_atual - possivel_valor_perdido_Y) + lucro_X
        Y_ganha_apostando_em_X_e_Y = (saldo_atual - valor_perdido_X) + possivel_lucro_Y
        print(
            "Novo saldo se X ganha, tendo apostado em X e Y: ",
            round(X_ganha_apostando_em_X_e_Y, 2),
        )
        print(
            "Novo saldo se Y ganha, tendo apostado em X e Y: ",
            round(Y_ganha_apostando_em_X_e_Y, 2),
        )

        if (
            X_ganha_apostando_em_X_e_Y > saldo_atual
            and Y_ganha_apostando_em_X_e_Y > saldo_atual
        ):
            print("Vale a pena apostar nas duas")
        else:
            print("Não vale a pena apostar nas duas")
        print(possivel_odd_Y)


calcular_lucro(saldo_atual, valor_perdido_X, odd_X)
