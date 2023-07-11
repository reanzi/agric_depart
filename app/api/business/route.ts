import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const { name } = await req.json()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })
        if (!name) return new NextResponse('Name is required', { status: 403 })

        const business = await prismadb.business.create({ data: { name, userId } })
        console.log('Created: ', business)
        return NextResponse.json(business)
    } catch (error) {
        console.log('[STORES_POST]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}