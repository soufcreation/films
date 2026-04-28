import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { signToken } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Nom d\'utilisateur et mot de passe requis' },
        { status: 400 }
      )
    }

    const { data: admin, error } = await supabaseAdmin
      .from('admins')
      .select('*')
      .eq('username', username)
      .single()

    if (error || !admin) {
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      )
    }

    const passwordMatch = await bcrypt.compare(password, admin.password)

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      )
    }

    const token = signToken({ id: admin.id, username: admin.username })

    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    })

    return response

  } catch {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}