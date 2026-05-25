import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Switch,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { contarFavoritos, totalCurtidasUsuario } from '../src/repositories/PostRepository';
import { buscarUsuarioPorId } from '../src/repositories/UsuarioRepositores';

// ─── Constantes de cor ────────────────────────────────────────────────────────

const COLORS = {
  primary: '#C0392B',
  primaryLight: '#FDECEA',
  background: '#FDF5F3',
  white: '#FFFFFF',
  border: '#F0E0DC',
  borderLight: '#F5EDE9',
  textPrimary: '#1A1A1A',
  textSecondary: '#888888',
  textMuted: '#AAAAAA',
  iconBlue: '#2563EB',
  iconBlueBg: '#E8F0FB',
  iconOrange: '#D97706',
  iconOrangeBg: '#FEF3E2',
  iconGreen: '#16A34A',
  iconGreenBg: '#E6F4EA',
  iconGray: '#555555',
  iconGrayBg: '#F0F0F0',
};

// ─── Componente: Avatar ───────────────────────────────────────────────────────

const Avatar: React.FC<{ initials: string }> = ({ initials }) => (
  <View style={styles.avatarWrap}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials.toUpperCase()}</Text>
    </View>
  </View>
);

// ─── Componente: Card de estatística ─────────────────────────────────────────

const StatCard: React.FC<{ value: number; label: string; isLast?: boolean }> = ({
  value,
  label,
  isLast,
}) => (
  <View style={[styles.stat, !isLast && styles.statBorder]}>
    <Text style={styles.statNum}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// ─── Componente: Item de menu ─────────────────────────────────────────────────

interface MenuItemProps {
  iconName: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showBadge?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  iconName,
  iconBg,
  iconColor,
  title,
  subtitle,
  onPress,
  rightElement,
  showBadge,
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.menuIcon, { backgroundColor: iconBg }]}>
      <Ionicons name={iconName} size={18} color={iconColor} />
    </View>
    <View style={styles.menuText}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>
    {showBadge && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>PRO</Text>
      </View>
    )}
    {rightElement ?? (
      <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
    )}
  </TouchableOpacity>
);

// ─── Componente: Título de seção ──────────────────────────────────────────────

const SectionTitle: React.FC<{ children: string }> = ({ children }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

// ─── Tela principal: Perfil ───────────────────────────────────────────────────

const ProfileScreen: React.FC = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [savedCount, setSavedCount] = useState(0);
  const [curtidas, setCurtidas] = useState(0);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [loading, setLoading] = useState(true);

  const carregarDados = useCallback(async () => {
    try {
      const [usuario, salvos, totalCurtidas] = await Promise.all([
        buscarUsuarioPorId(Number(userId)),
        contarFavoritos(),
        totalCurtidasUsuario(Number(userId)),
      ]);
      if (usuario) setNomeUsuario(usuario.nome);
      setSavedCount(salvos);
      setCurtidas(totalCurtidas);
    } catch {
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const inicial = nomeUsuario.charAt(0) || '?';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar + Nome */}
        <View style={styles.avatarSection}>
          <Avatar initials={inicial} />
          <Text style={styles.userName}>{nomeUsuario}</Text>
        </View>

        {/* Estatísticas */}
        {loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color={COLORS.primary} />
          </View>
        ) : (
          <View style={styles.statsRow}>
            <StatCard value={savedCount} label="Salvos" />
            <StatCard value={curtidas} label="Curtidas" isLast />
          </View>
        )}

        {/* ── Seção: Conta ── */}
        <SectionTitle>Conta</SectionTitle>
        <View style={styles.card}>
          <MenuItem
            iconBg={COLORS.primaryLight}
            iconColor={COLORS.primary}
            iconName="person-outline"
            title="Dados pessoais"
            subtitle="Nome, e-mail, senha"
          />
          <View style={styles.divider} />
          <MenuItem
            iconBg={COLORS.iconBlueBg}
            iconColor={COLORS.iconBlue}
            iconName="shield-checkmark-outline"
            title="Privacidade"
            subtitle="Visibilidade e dados"
          />
          <View style={styles.divider} />
          <MenuItem
            iconBg={COLORS.iconOrangeBg}
            iconColor={COLORS.iconOrange}
            iconName="star-outline"
            title="Assinatura"
            subtitle="Plano gratuito"
            showBadge
          />
        </View>

        {/* ── Seção: Preferências ── */}
        <SectionTitle>Preferências</SectionTitle>
        <View style={styles.card}>
          <MenuItem
            iconBg={COLORS.primaryLight}
            iconColor={COLORS.primary}
            iconName="notifications-outline"
            title="Notificações"
            subtitle="Alertas e avisos"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#DDD', true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            }
          />
          <View style={styles.divider} />
          <MenuItem
            iconBg={COLORS.iconGrayBg}
            iconColor={COLORS.iconGray}
            iconName="moon-outline"
            title="Tema"
            subtitle="Claro / Escuro"
          />
          <View style={styles.divider} />
          <MenuItem
            iconBg={COLORS.iconGreenBg}
            iconColor={COLORS.iconGreen}
            iconName="heart-outline"
            title="Categorias favoritas"
            subtitle="Tecnologia, Negócios"
          />
        </View>

        {/* ── Seção: Suporte ── */}
        <SectionTitle>Suporte</SectionTitle>
        <View style={styles.card}>
          <MenuItem
            iconBg={COLORS.iconGrayBg}
            iconColor={COLORS.iconGray}
            iconName="help-circle-outline"
            title="Ajuda e suporte"
            subtitle="FAQ e contato"
          />
          <View style={styles.divider} />
          <MenuItem
            iconBg={COLORS.iconGrayBg}
            iconColor={COLORS.iconGray}
            iconName="information-circle-outline"
            title="Sobre o app"
            subtitle="Versão 1.0.0"
          />
        </View>

        {/* Botão sair */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={18} color={COLORS.primary} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },

  // Avatar
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarWrap: {
    marginBottom: 12,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.white,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },

  // Loading
  loadingRow: {
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 24,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  stat: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  statBorder: {
    borderRightWidth: 0.5,
    borderRightColor: COLORS.border,
  },
  statNum: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  // Section title
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    marginBottom: 8,
  },

  // Card
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },

  // Menu item
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  divider: {
    height: 0.5,
    backgroundColor: COLORS.borderLight,
    marginLeft: 64,
  },

  // Badge PRO
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 8,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },

  // Logout
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 4,
    paddingVertical: 14,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default ProfileScreen;
