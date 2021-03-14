export type CatGender = 'female' | 'male' | 'diverse'

export interface Cat {
    id: number
    name: string
    breed: string
    gender: CatGender
    age: number
}

export interface CatsStatistics {
    amount: number
    averageAge: number
}


export interface MastItem {
    RemoteKey: string
    Barcode: string
    FriendlyName: string

    

}

export interface PLItem {
    QTYORIGORD: number
    QTYTOSUPP: number
    QTYSCANNED: number
    dtscanned: Date


}

export interface PLHead {
    headerId: number
    sourceDocId: number
    sourceDocType: string
}

export interface PLBody {
    lineId: number

}

